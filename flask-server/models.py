from config import db

class ProductListing(db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    code = db.Column(db.Integer, unique=True, nullable=False)
    name = db.Column(db.String(1000), unique=False, nullable=False)
    supermarket = db.Column(db.String(1000), unique=False, nullable=False)
    price = db.Column(db.Float, unique=False, nullable=False)
    price_off = db.Column(db.Float, unique=False)
    offer_text = db.Column(db.String(1000), unique=False)
    url = db.Column(db.String(1000), unique=False, nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "code": self.code,
            "name": self.name,
            "supermarket": self.supermarket,
            "price": self.price,
            "price_off": self.price_off,
            "offer_text": self.offer_text,
            "url": self.url
        }
    