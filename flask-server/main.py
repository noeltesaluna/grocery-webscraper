from flask import request, jsonify
from config import app, db
from webscraper import coles_webscraper
from models import ProductListing
from bs4 import BeautifulSoup
import requests
# create ProductListing

@app.route("/productlistings", methods=["GET"])
def get_productlistings():
    # obtain product listings in the form of python objects
    productlistings = ProductListing.query.all()
    # convert product listings into python dictionary list
    json_productlistings = list(map(lambda x: x.to_json(), productlistings))
    return jsonify({"productlistings": json_productlistings})

@app.route("/create_productlisting", methods=["POST"])
def create_productlisting():
    URL = request.json.get("url")

    try:
        new_productlisting = coles_webscraper(URL)
        db.session.add(new_productlisting)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "Product listing created!"}), 201

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