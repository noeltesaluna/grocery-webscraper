from bs4 import BeautifulSoup
from models import ProductListing
import requests
def get_page_soup(url):
    """
    Fetches and returns the soup of the given url.
    """
    page = requests.get(url).text
    return BeautifulSoup(page, 'html.parser')

def get_product_title(soup):
    """
    Extracts and returns the product title from the BeautifulSoup object.
    """
    product_title = ""
    if soup.find(class_="product__title") is not None:
        product_title = soup.find(class_="product__title").text
    return product_title

def get_product_code(soup):
    """
    Extracts and returns the product code from the BeautifulSoup object.
    """
    product_code = ""
    if soup.find('p', attrs={'data-testid': 'product-code'}) is not None:
        product_code = soup.find('p', attrs={'data-testid': 'product-code'}).text
        product_code = int(product_code[product_code.find(": ") + 1:])
    return product_code

def get_product_price(soup):
    """
    Extracts and returns the product price from the BeautifulSoup object.
    """
    product_price = ""
    if soup.find(class_="price__value") is not None:
        product_price = soup.find(class_="price__value").text
        product_price = product_price[product_price.find("$") + 1:]
    return product_price

def get_product_price_off(soup):
    """
    Extracts and returns the save price from the BeautifulSoup object.
    """
    product_price_off = 0
    if soup.find('section', class_ = "badge-label") is not None:
        product_price_off = soup.find('section', class_ = "badge-label").text
        product_price_off = product_price_off[product_price_off.find("$") + 1:]
    return product_price_off

def get_product_offer_text(soup):
    """
    Extracts and returns the special offer text from the BeautifulSoup object.
    """
    product_offer_text = ""
    if soup.find('button', attrs={'data-testid': 'complex-promotion-link'}) is not None:
        product_offer_text = soup.find('button', attrs={'data-testid': 'complex-promotion-link'}).text
    return product_offer_text
         
def coles_webscraper(_URL):
    """
    Extract and returns an object for the ProductListing
    """
    soup = get_page_soup(_URL)
    
    product_title = get_product_title(soup)
    if not product_title:
        raise ValueError("That URL doesn't contain a product from Coles")
    
    product_code = get_product_code(soup)
    price_off = get_product_price_off(soup)
    product_price = get_product_price(soup)
    product_special_offer_text = get_product_offer_text(soup)

    return ProductListing(
        code=product_code,
        name=product_title,
        supermarket="Coles",
        price=product_price,
        price_off=price_off,
        offer_text=product_special_offer_text,
        url = _URL
    )