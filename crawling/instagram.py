from bs4 import BeautifulSoup as BS4
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.alert import Alert
import datetime
import time
import re
import json
import orderedSet

def login(web, email, pw):
    web.find_element_by_xpath('//*[@id="loginForm"]/div/div[1]/div/label/input').send_keys(email)
    web.find_element_by_xpath('//*[@id="loginForm"]/div/div[2]/div/label/input').send_keys(pw)
    web.find_element_by_xpath('//*[@id="loginForm"]/div/div[3]/button').click()

def loginWithFacebook(web, email, pw):
    web.find_element_by_xpath('//*[@id="loginForm"]/div/div[5]/button').click()
    web.find_element_by_xpath('//*[@id="email"]').send_keys(email)
    web.find_element_by_xpath('//*[@id="pass"]').send_keys(pw)
    web.find_element_by_xpath('//*[@id="loginbutton"]').click()
    
def instagram(email , password, dirs, useFacebookLogin = False, ):
    webdriverLocation = 'Chrome_90.0.4430.24_linux64\\chromedriver.exe'
    # webdriverLocation = 'Python\\Chrome_88.0.4324.96\\chromedriver.exe'

    options = webdriver.ChromeOptions()
    # options.add_argument('headless')
    options.add_argument('window-size=1920x1080')
    options.add_argument('disable-gpu')
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36")
    options.add_experimental_option("prefs",{"profile.default_content_setting_values.notifications" : 2})
    driver = webdriver.Chrome(webdriverLocation, options = options)


    # 로그인
    driver.get('https://www.instagram.com/')
    driver.implicitly_wait(3)
    if useFacebookLogin:
        loginWithFacebook(driver,email,password)
    else:
        login(driver,email,password)
    driver.implicitly_wait(3)
    while True:
        if driver.current_url == 'https://www.instagram.com/':
            break
        time.sleep(1)
    try:
        Alert(driver).dismiss()
    except:
        pass

    driver.implicitly_wait(3)
    driver.execute_script('window.scrollTo(0, document.body.scrollHeight);')
    driver.implicitly_wait(3)
    driver.refresh()
    data = []
    content_list = orderedSet.OrderedSet()


    # 게시글 불러오기를 위한 5초간 스크롤 다운 실행
    start = datetime.datetime.now()
    end = start + datetime.timedelta(seconds=5)
    while True:
        driver.execute_script('window.scrollTo(0, document.body.scrollHeight);')
        driver.implicitly_wait(3)

        html = driver.page_source
        soup = BS4(html,'html.parser')

        for iter in soup.find_all('article'):
            content_list.add(iter)

        if datetime.datetime.now() > end:
            break

    data = []

    for content in content_list:
        header = content.contents[0]
        body = content.contents[2]
        comment = content.contents[3]

        pageImage = header.find_all('img',attrs={'data-testid':'user-avatar'})[0].attrs['src']
        pageName = header.find_all('a',attrs={'tabindex':'0'})
        if pageName[0].text != '':
            pageName = pageName[0].text
        else :
            pageName = pageName[1].text
        #pageName = header.find_all('a',attrs={'tabindex':'0'})[0].text

        location = ""
        like = ""
        for iter in header.find_all('a',attrs={'tabindex':'0'}):
            if 'href' in iter.attrs and 'locations' in iter.attrs['href']:
                location = iter.text
            if 'href' in iter.attrs and 'liked_by' in iter.attrs['href']:
                like = iter.text
            
        
        mainText = ""
        mainImg = []
        for iter in body.find_all('img',{'src':re.compile(r'.*')}):
            if 'src' in iter.attrs:
                mainImg.append(iter.attrs['src'])
        
        for iter in comment.find_all('a',attrs={'tabindex':'0'}):
            if 'href' in iter.attrs and 'liked_by' in iter.attrs['href']:
                like = iter.text
        mainText = comment.find('div',{'data-testid':'post-comment-root'}).text

        dataIter = {
            "pageName" : pageName,
            "pageImage" : {
                "src" : pageImage,
                # 40 -> 40px
                "height": 150,
                "width" : 150,
            },
            "location": location,
            "description" : mainText,
            "like":like,
            "media" : mainImg
        }
        data.append(dataIter)

    jsonData = {}
    jsonData["data"] = data

    with open(dirs + "\\instagram.json", "w", encoding='utf8') as json_file:
        json.dump(data, json_file, indent=4, ensure_ascii = False)

