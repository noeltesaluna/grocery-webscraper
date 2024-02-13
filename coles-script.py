from bs4 import BeautifulSoup
import requests

URL = "https://www.coles.com.au/product/raw-c-pure-natural-coconut-water-1l-3517705"
page = requests.get(URL)

soup = BeautifulSoup(page.text, 'html.parser')

product_title = soup.find(class_ = "product__title").text
price_value = soup.find(class_ = "price__value").text

if soup.find(class_ = "is-special") is not None:
    print("On Sale!")
    if soup.find('button', attrs={'data-testid': 'complex-promotion-link'}) is not None:
        print(soup.find('button', attrs={'data-testid': 'complex-promotion-link'}).text)
    else:
        print(soup.find('section', class_ = "badge-label").text)

print("Title:", product_title, "\nPrice:", price_value)