# This sample code supports Appium Python client >=2.3.0
# pip install Appium-Python-Client
# Then you can paste this into a file and simply run with Python

from appium import webdriver
from appium.options.common.base import AppiumOptions
from appium.webdriver.common.appiumby import AppiumBy

# For W3C actions
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.actions import interaction
from selenium.webdriver.common.actions.action_builder import ActionBuilder
from selenium.webdriver.common.actions.pointer_input import PointerInput

options = AppiumOptions()
options.load_capabilities({
	"appium:automationName": "UiAutomator2",
	"appium:platformName": "Android",
	"appium:platformVersion": "11",
	"appium:deviceName": "214c4bf7",
	"appium:appPackage": "host.exp.exponent",
	"appium:appActivity": "host.exp.exponent.LauncherActivity",
	"appium:noReset": True,
	"appium:newCommandTimeout": 3600,
	"appium:connectHardwareKeyboard": True
})

driver = webdriver.Remote("http://127.0.0.1:4723", options=options)

el1 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"com.horcrux.svg.O\").instance(0)")
el1.click()
driver.implicitly_wait(10)  # Wait up to 10 seconds for ANY element
el2 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().text(\"Email or Username\")")
el2.send_keys("kane@kane.com")
el3 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().text(\"Password\")")
el3.send_keys("testTest123!")
el4 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().text(\"Restaurant\")")
el4.click()
el5 = driver.find_element(by=AppiumBy.CLASS_NAME, value="com.horcrux.svg.O")
el5.click()
el6 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().text(\"Orders\")")
el6.click()
el7 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().text(\"Accept\")")
el7.click()
el8 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Confirm")
el8.click()
el9 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value=", Settings")
el9.click()
el10 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value=", Products")
el10.click()
el11 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="+")
el11.click()

driver.quit()