import requests
from bs4 import BeautifulSoup

#https://www.geeksforgeeks.org/extract-all-the-urls-from-the-webpage-using-python/

url = 'https://www.geeksforgeeks.org/extract-all-the-urls-from-the-webpage-using-python/'
print("\nThis is the url we are acting on: {}\n".format(url))
reqs = requests.get(url)
soup = BeautifulSoup(reqs.text, 'html.parser')

urls = []
for link in soup.find_all('a'):
    print(link.get('href'))
