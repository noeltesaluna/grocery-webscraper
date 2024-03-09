from flask import request, jsonify
from config import app, db
from webscraper import coles_webscraper
from models import ProductListing

# GET all product listings
@app.route("/product_listings", methods=["GET"])
def get_product_listings():
    product_listings = ProductListing.query.all()
    json_product_listings = list(map(lambda x: x.to_json(), product_listings))
    return jsonify({"product_listings": json_product_listings})

# Create a product listing
@app.route("/product_listings", methods=["POST"])
def create_product_listing():
    URL = request.json.get("url")
    try:
        new_product_listing = coles_webscraper(URL)
        db.session.add(new_product_listing)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    return jsonify({"message": "Product listing created!"}), 201

# Update all product listings
@app.route("/update_productlistings", methods=["POST"])
def update_productlistings():
    productlistings = ProductListing.query.all()
    try:
        for productlisting in productlistings:
            updatedProductlisting = coles_webscraper(productlisting.url)
            productlisting.price = updatedProductlisting.price
            productlisting.price_off = updatedProductlisting.price_off
            productlisting.offer_text = updatedProductlisting.offer_text
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    return jsonify({"message": "Updated product listings!"}), 201
        
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)