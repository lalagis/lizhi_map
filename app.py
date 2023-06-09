from robyn import Robyn, Request, jsonify
from prisma import Prisma
import json

# init
app = Robyn(__file__)
prisma = Prisma(auto_register=True)

@app.startup_handler
async def startup_handler() -> None:
    await prisma.connect()

@app.shutdown_handler
async def shutdown_handler() -> None:
    if prisma.is_connected:
        await prisma.disconnect()

# routes
# get all points
@app.get("/points")
async def get_points():
    res = await prisma.query_raw(r'SELECT id, ST_AsGeoJSON(location) AS location FROM public."Point"')
    # get properties
    for index, point in enumerate(res):
        property = await prisma.pointproperty.find_unique(where={
            "pointId": point["id"]
        })
        res[index]["property"] = jsonify({
            "likes": property.likes if (property != None) else None,
            "matureStatus": property.matureStatus if (property != None) else None
        })
    return jsonify({
        "collection": res,
    })

# get all nearest points by lng, lat and distance
@app.get("/points/nearest")
async def get_nearest_points(request: Request):
    try:
        query = request.queries
        lng = float(query["lng"])
        lat = float(query["lat"])
        distance = float(query["distance"])
        res = await prisma.query_raw(r'SELECT id, ST_AsGeoJSON(location) AS location FROM public."Point" WHERE ST_Distance(location, ST_SetSRID(ST_MakePoint({}, {}), 4326)) <= {}'.format(lng, lat, distance))
        # get properties
        for index, point in enumerate(res):
            property = await prisma.pointproperty.find_unique(where={
                "pointId": point["id"]
            })
            res[index]["property"] = jsonify({
                "likes": property.likes if (property != None) else None,
                "matureStatus": property.matureStatus if (property != None) else None
            })
        return jsonify({
            "collection": res,
        })
    except (KeyError, ValueError) as e:
        print(f"An exception of type {type(e).__name__} occurred with message: {e}")

# get all linestrings
@app.get("/linestrings")
async def get_linestrings():
    res = await prisma.query_raw(r'SELECT id, ST_AsGeoJSON(geometry) AS line FROM public."Linestring"')
    return jsonify({
        "collection": res,
    })

# get all polygons
@app.get("/polygons")
async def get_polygons():
    res = await prisma.query_raw(r'SELECT id, ST_AsGeoJSON(geometry) AS polygon FROM public."Polygon"')
    return jsonify({
        "collection": res,
    })

# add a point by lng and lat (or mature status)
@app.post("/point")
async def post_point(request: Request):
    try:
        request = json.loads(request.body)
        lng: float = request["body"]["lng"]
        lat: float = request["body"]["lat"]
        # check if mature status is provided
        mature_status = request["body"]["matureStatus"] if ("matureStatus" in request["body"]) else None
        res = await prisma.query_raw(r'INSERT INTO public."Point" (location) VALUES (ST_SetSRID(ST_MakePoint({}, {}), 4326)) RETURNING id'.format(lng, lat))
        if (mature_status != None):
            id = res[0]["id"]
            await prisma.pointproperty.create(data={
                "matureStatus": mature_status,
                "pointId": id
            })
        return True
    except (KeyError, ValueError) as e:
        print(f"An exception of type {type(e).__name__} occurred with message: {e}")
        return False
    
# add a linestring by geometry (or reason)
@app.post("/linestring")
async def post_linestring(request: Request):
    try:
        request = json.loads(request.body)
        geometry = request["body"]["geometry"]
        reason = request["body"]["reason"] if ("reason" in request["body"]) else None
        # geometry to str
        geometry = "'" + str(jsonify(geometry)) + "'"
        res = await prisma.query_raw(r'INSERT INTO public."Linestring" (geometry) VALUES (ST_GeomFromGeoJSON({})) RETURNING id'.format(geometry))
        if (reason != None):
            id = res[0]["id"]
            await prisma.linestringproperty.create(data={
                "reason": reason,
                "linestringId": id
            })
        return True
    except (KeyError, ValueError) as e:
        print(f"An exception of type {type(e).__name__} occurred with message: {e}")
        return False
    
# add a polygon by geometry (or recommended route id)
@app.post("/polygon")
async def post_polygon(request: Request):
    try:
        request = json.loads(request.body)
        geometry = request["body"]["geometry"]
        recommended_route_id = request["body"]["recommendedRouteId"] if ("recommendedRouteId" in request["body"]) else None
        # geometry to str
        geometry = "'" + str(jsonify(geometry)) + "'"
        res = await prisma.query_raw(r'INSERT INTO public."Polygon" (geometry) VALUES (ST_GeomFromGeoJSON({})) RETURNING id'.format(geometry))
        if (recommended_route_id != None):
            id = res[0]["id"]
            await prisma.polygon.create(data={
                "recommendedRouteId": recommended_route_id,
                "polygonId": id
            })
        return True
    except (KeyError, ValueError) as e:
        print(f"An exception of type {type(e).__name__} occurred with message: {e}")
        return False
    
# get point by id
@app.get("/point/:id")
async def point(request: Request):
    id = int(request.path_params["id"])
    res = await prisma.pointproperty.find_unique(where={
        "pointId": int(id)
    })
    return jsonify({
        "id": id,
        "property": {
            "matureStatus": res.matureStatus if (res != None) else None,
            "likes": res.likes if (res != None) else None
        }
    })

# get linestring by id
@app.get("/linestring/:id")
async def linestring(request: Request):
    id = int(request.path_params["id"])
    res = await prisma.linestringproperty.find_unique(where={
        "linestringId": id
    })
    polygons = await prisma.polygon.find_many(where={
        "recommendedRouteId": id
    })
    return jsonify({
        "id": id,
        "property": {
            "reason": res.reason if (res != None) else None,
            "relatedPolygons": polygons if (polygons != None) else None
        }
    })

# get polygon by id
@app.get("/polygon/:id")
async def polygon(request: Request):
    id = int(request.path_params["id"])
    res = await prisma.polygon.find_unique(where={
        "id": id
    })
    return jsonify({
        "id": id,
        "property": {
            "recommendedRouteId": res.recommendedRouteId
        }
    })

# update point by id (location or mature status)
@app.put("/point/:id")
async def update_point(request: Request):
    try:
        id = int(request.path_params["id"])
        request = json.loads(request.body)
        lng = request["body"]["lng"] if ("lng" in request["body"]) else None
        lat = request["body"]["lat"] if ("lat" in request["body"]) else None
        mature_status = request["body"]["matureStatus"] if ("matureStatus" in request["body"]) else None

        if (lng != None and lat != None):
            # query raw
            await prisma.query_raw(r'UPDATE public."Point" SET location = ST_SetSRID(ST_MakePoint({}, {}), 4326) WHERE id = {}'.format(lng, lat, id))
        if (mature_status != None):
            # check if point property exists
            existing = await prisma.pointproperty.find_unique(where={
                "pointId": id
            })
            if (existing == None):
                await prisma.pointproperty.create(data={
                    "matureStatus": mature_status,
                    "pointId": id
                })
            else:
                await prisma.pointproperty.update(where={
                    "id": existing.id
                }, data={
                    "matureStatus": mature_status
                })
        return True
    except (KeyError, ValueError) as e:
        print(f"An exception of type {type(e).__name__} occurred with message: {e}")
        return False
    
# update linestring by id (geometry or reason)
@app.put("/linestring/:id")
async def update_linestring(request: Request):
    try:
        id = int(request.path_params["id"])
        request = json.loads(request.body)
        geometry = request["body"]["geometry"] if ("geometry" in request["body"]) else None
        reason = request["body"]["reason"] if ("reason" in request["body"]) else None
        if (geometry != None):
            # geometry to str
            geometry = "'" + str(jsonify(geometry)) + "'"
            # query raw
            await prisma.query_raw(r'UPDATE public."Linestring" SET geometry = ST_GeomFromGeoJSON({}) WHERE id = {}'.format(geometry, id))
        if (reason != None):
            # check if property exists
            existing = await prisma.linestringproperty.find_unique(where={
                "linestringId": id
            })
            if (existing == None):
                await prisma.linestringproperty.create(data={
                    "reason": reason,
                    "linestringId": id
                })
            else:
                await prisma.linestringproperty.update(where={
                    "id": existing.id
                }, data={
                    "reason": reason
                })
        return True
    except (KeyError, ValueError) as e:
        print(f"An exception of type {type(e).__name__} occurred with message: {e}")
        return False
    
# update polygon by id (geometry or recommended route id)
@app.put("/polygon/:id")
async def update_polygon(request: Request):
    try:
        id = int(request.path_params["id"])
        request = json.loads(request.body)
        geometry = request["body"]["geometry"] if ("geometry" in request["body"]) else None
        recommended_route_id = request["body"]["recommendedRouteId"] if ("recommendedRouteId" in request["body"]) else None
        if (geometry != None):
            # geometry to str
            geometry = "'" + str(jsonify(geometry)) + "'"
            # query raw
            await prisma.query_raw(r'UPDATE public."Polygon" SET geometry = ST_GeomFromGeoJSON({}) WHERE id = {}'.format(geometry, id))
        if (recommended_route_id != None):
            await prisma.polygon.update(where={
                "id": id
            }, data={
                "recommendedRouteId": recommended_route_id
            })
        return True
    except (KeyError, ValueError) as e:
        print(f"An exception of type {type(e).__name__} occurred with message: {e}")
        return False
    
# delete point by id and all related properties
@app.delete("/point/:id")
async def delete_point(request: Request):
    try:
        id = int(request.path_params["id"])
        await prisma.point.delete_many(where={
            "id": id
        })
        await prisma.pointproperty.delete_many(where={
            "pointId": id
        })
        return True
    except (KeyError, ValueError) as e:
        print(f"An exception of type {type(e).__name__} occurred with message: {e}")
        return False
    
# delete linestring by id and all related properties
@app.delete("/linestring/:id")
async def delete_linestring(request: Request):
    try:
        id = int(request.path_params["id"])
        await prisma.linestring.delete_many(where={
            "id": id
        })
        await prisma.linestringproperty.delete_many(where={
            "linestringId": id
        })
        return True
    except (KeyError, ValueError) as e:
        print(f"An exception of type {type(e).__name__} occurred with message: {e}")
        return False
    
# delete polygon by id
@app.delete("/polygon/:id")
async def delete_polygon(request: Request):
    try:
        id = int(request.path_params["id"])
        await prisma.polygon.delete_many(where={
            "id": id
        })
        return True
    except (KeyError, ValueError) as e:
        print(f"An exception of type {type(e).__name__} occurred with message: {e}")
        return False


app.start(port=8080)