import pymongo

MONGO_HOST= "localhost"
MONGO_PORT="27017"
MONGO_TIME_OUT=1000

MONGO_URI="mongodb://"+MONGO_HOST+":"+MONGO_PORT+"/"

MONGO_DATABASE="JuegoProgramacion"

try: 

    cliente=pymongo.MongoClient(MONGO_URI,serverSelectionTimeoutMS=MONGO_TIME_OUT)
    cliente.server_info()
    print("Conexion a mongo exitosa")
    cliente.close()

except pymongo.errors.ServerSelectionTimeoutError as errorTime:
    print("Tiempo exedido" + errorTime)
except pymongo.errors.ConnectionFailure as errorConection:
    print("Fallo al conectarse a mongodb"+errorConection) 