# This sample code supports Appium Python client >=2.3.0
# pip install Appium-Python-Client
# Then you can paste this into a file and simply run with Python

#dont forget to scroll and chance the device name

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
el2.send_keys("user2test@email.com")
el3 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().text(\"Password\")")
el3.send_keys("StrongPass123!")
el4 = driver.find_element(by=AppiumBy.CLASS_NAME, value="com.horcrux.svg.O")
el4.click()
driver.implicitly_wait(10)  # Wait up to 10 seconds for ANY element
actions = ActionChains(driver)
driver.implicitly_wait(10)  # Wait up to 10 seconds for ANY element
actions.w3c_actions = ActionBuilder(driver, mouse=PointerInput(interaction.POINTER_TOUCH, "touch"))
actions.w3c_actions.pointer_action.move_to_location(473, 2090)
actions.w3c_actions.pointer_action.pointer_down()
actions.w3c_actions.pointer_action.move_to_location(313, 134)
actions.w3c_actions.pointer_action.release()
actions.perform()


driver.implicitly_wait(20)  # Wait up to 10 seconds for ANY element
el5 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Kane, desserts, seafood, Vice City., 📞 1022544415, ⏳ Hours not available, 🔴 Closed")
el5.click()

"""el6 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Navigate up")
el6.click()

actions = ActionChains(driver)
actions.w3c_actions = ActionBuilder(driver, mouse=PointerInput(interaction.POINTER_TOUCH, "touch"))
actions.w3c_actions.pointer_action.move_to_location(496, 1827)
actions.w3c_actions.pointer_action.pointer_down()
actions.w3c_actions.pointer_action.move_to_location(420, 750)
actions.w3c_actions.pointer_action.release()
actions.perform()

actions = ActionChains(driver)
actions.w3c_actions = ActionBuilder(driver, mouse=PointerInput(interaction.POINTER_TOUCH, "touch"))
actions.w3c_actions.pointer_action.move_to_location(406, 1844)
actions.w3c_actions.pointer_action.pointer_down()
actions.w3c_actions.pointer_action.move_to_location(514, 522)
actions.w3c_actions.pointer_action.release()
actions.perform()


el12 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.ImageView\").instance(2)")
el12.click()
"""
el13 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().description(\"+\").instance(0)")
el13.click()
el14 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().description(\"+\").instance(1)")
el14.click()
el15 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="2 items • $91.00 ➔ Checkout")
el15.click()
el16 = driver.find_element(by=AppiumBy.ID, value="android:id/button1")
el16.click()
el17 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().text(\"\")")
el17.click()

driver.quit()
"""el9.click()
el10 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().text(\"\")")
el10.click()
el11 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().text(\"Update your name, photo, and personal details\")")
el11.click()
el12 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="+ Add New Address")
el12.click()
actions = ActionChains(driver)
actions.w3c_actions = ActionBuilder(driver, mouse=PointerInput(interaction.POINTER_TOUCH, "touch"))
actions.w3c_actions.pointer_action.move_to_location(567, 2019)
actions.w3c_actions.pointer_action.pointer_down()
actions.w3c_actions.pointer_action.move_to_location(549, 1335)
actions.w3c_actions.pointer_action.release()
actions.perform()

actions = ActionChains(driver)
actions.w3c_actions = ActionBuilder(driver, mouse=PointerInput(interaction.POINTER_TOUCH, "touch"))
actions.w3c_actions.pointer_action.move_to_location(366, 1840)
actions.w3c_actions.pointer_action.pointer_down()
actions.w3c_actions.pointer_action.move_to_location(554, 880)
actions.w3c_actions.pointer_action.release()
actions.perform()

el13 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().text(\"Label\")")
el13.click()
el13.send_keys("abc")
el14 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().text(\"Street\")")
el14.send_keys("pyranids")
el15 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().text(\"Area\")")
el15.send_keys("giza")
el16 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().text(\"City\")")
el16.send_keys("cairo")
actions = ActionChains(driver)
actions.w3c_actions = ActionBuilder(driver, mouse=PointerInput(interaction.POINTER_TOUCH, "touch"))
actions.w3c_actions.pointer_action.move_to_location(393, 1179)
actions.w3c_actions.pointer_action.pointer_down()
actions.w3c_actions.pointer_action.move_to_location(406, 585)
actions.w3c_actions.pointer_action.release()
actions.perform()

el17 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().text(\"Building\")")
el17.send_keys("11")
el18 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().text(\"Floor\")")
el18.send_keys("4")
el19 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().text(\"Apartment\")")
el19.send_keys("21")
actions = ActionChains(driver)
actions.w3c_actions = ActionBuilder(driver, mouse=PointerInput(interaction.POINTER_TOUCH, "touch"))
actions.w3c_actions.pointer_action.move_to_location(558, 951)
actions.w3c_actions.pointer_action.pointer_down()
actions.w3c_actions.pointer_action.move_to_location(652, 152)
actions.w3c_actions.pointer_action.release()
actions.perform()

el24 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().text(\"Add Address\")")
el24.click()
el25 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().text(\"Set Default\").instance(1)")
el25.click()

el20 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Save Changes")
el20.click()


driver.quit()"""














