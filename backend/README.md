# robyn prisma postgres postgis

## set venv
python3 -m venv venv

## activate venv
source venv/bin/activate

## install requirements
pip install -r requirements.txt

## edit .env db url like .env.example

## after update schema.prisma (if needed)
prisma db push

## run server (dev)
python3 app.py --dev