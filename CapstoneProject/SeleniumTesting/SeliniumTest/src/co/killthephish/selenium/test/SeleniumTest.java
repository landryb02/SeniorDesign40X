package co.killthephish.selenium.test;

import java.util.ArrayList;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.interactions.internal.Coordinates;
import org.openqa.selenium.interactions.internal.Locatable;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class SeleniumTest {
	private static ArrayList<String> tabs;
	//Disclaimer, I know this code looks bad, I'll fix it up when I get the chance
	
	
	//needs to move out of a link in order to change whether the link is safe or not
	public static void main(String[] args) throws InterruptedException {
		
		//Test variables
		boolean hovertest1 = false;
		boolean hovertest2 = false;
		boolean hovertest3 = false;
		boolean clicktest1 = false;
		boolean clicktest2 = false;
		boolean backtest = false;
		boolean fronttest = false;
		boolean popuptest1 = false;
		boolean popuptest2 = false;
		boolean popuptest3 = false;
		boolean popuptest4 = false;
		boolean popuptest5 = false;

		//needs to get the chrome driver to get Selenium to work on Chrome
		//THE LOCATION WILL CHANGE IF DONE ON ANOTHER COMPUTER
		System.setProperty("webdriver.chrome.driver", "C:\\Users\\matthew\\Dropbox\\College\\Previous Tech classes\\Winter 2021\\Senior Capstone 1\\Automated Testing\\Downloaded_Stuff\\chromedriver_win32\\chromedriver.exe");
		
		//needs to get the unpacked extension, lines 25-35 copied directly from sites.google.com/a/chromium.org/chromedriver/extensions
		//on how to get unpacked extensions to work with Selenium
		ChromeOptions options = new ChromeOptions();
		//in order to get an unpacked Chrome extension to work, you need to tell it where the extension is located.
		//THE LOCATION WILL CHANGE IF DONE ON ANOTHER COMPUTER
		options.addArguments("load-extension=C:\\Users\\matthew\\Dropbox\\College\\Spring 2021\\Senior Capstone\\CapstoneProject");

		DesiredCapabilities capabilities = new DesiredCapabilities();
		capabilities.setCapability(ChromeOptions.CAPABILITY, options);
		//sets up the webdriver to use Chrome
		ChromeDriver driver = new ChromeDriver(capabilities);
		
		
		//first I need to test if the safe works.
		//To do this, start out like before with the wikipedia page.
		//goes to this website, can be any website, but this has a lot of links I can use
		driver.get("http://en.wikipedia.org/wiki/Wiki");
		driver.manage().window().maximize();
		//This is to let the extension load fully
		for (int i=3; i>0; i--) {
			System.out.println("Letting extension fully load " + i + " seconds left");
			Thread.sleep(1000);
		}
		System.out.println("Start Test");
		
		String text;
		String visibility;
		
		//Now it's time to actually start the test test
		//Move the element to start at a position that is not a link
		//gets the coordinates of it and puts it in a Coordinates class so the mouse can move to that location
		WebElement myelement = driver.findElement(By.id("mw-toc-heading"));
		Locatable element = (Locatable) myelement;
		Coordinates coords = element.getCoordinates();
		driver.getMouse().mouseMove(coords);
		//System.out.println("moved mouse to contents");
		//checks the visibility and sees if it matches what it should
		visibility = driver.findElement(By.id("popup")).getCssValue("visibility");
		//System.out.println(visibility);
		if (visibility.equals("hidden")) {
			hovertest1 = true;
		}
		
		//moves the mouse to a specified link on the page
		myelement = driver.findElement(By.linkText("hypertext"));
		element = (Locatable) myelement;
		coords = element.getCoordinates();
		driver.getMouse().mouseMove(coords);
		//System.out.println("moved mouse to a link");
		//checks the popup text and visibility and sees if it matches what it should
		text = driver.findElement(By.id("popup")).getText();
		//System.out.println(text);
		visibility = driver.findElement(By.id("popup")).getCssValue("visibility");
		//System.out.println(visibility);
		if (text.equals("SAFE") && visibility.equals("visible")) {
			hovertest2 = true;
		}
		
		
		//goes to the link
		driver.getMouse().mouseDown(coords);
		driver.getMouse().mouseUp(coords);
		//checks if on the right page
		//check the title of the current page that the test is on to see if our extension worked as it should
		if (driver.getTitle().equals("Hypertext - Wikipedia")) {
			clicktest1 = true;
		}
				
		
		
		//Then I need to test if the unsafe works
		//use "https://www.wicar.org/test-malware.html"
		driver.get("https://www.wicar.org/test-malware.html");
		myelement = driver.findElement(By.xpath("//*[@id=\"wsite-content\"]/div[3]/div/div/table/tbody/tr/td[1]/div[1]/a"));
		element = (Locatable) myelement;
		coords = element.getCoordinates();
		driver.getMouse().mouseMove(coords);
		
		//Letting popup load
		Thread.sleep(201);
		//checks the popup text and visibility and sees if it matches what it should
		text = driver.findElement(By.id("popup")).getText();
		//System.out.println(text);
		visibility = driver.findElement(By.id("popup")).getCssValue("visibility");
		//System.out.println(visibility);
		if (text.equals("UNSAFE") && visibility.equals("visible")) {
			hovertest3 = true;
		}
		
		//Next I need to click on the bad link
		driver.getMouse().mouseDown(coords);
		
		//check if the popup appeared
		if (driver.getTitle().contains("Warning")) {
			clicktest2 = true;
		}
				
		//now I need to test the forward/back buttons on the warning page
		//back first, use the same website
		
		backtest = warningPageCheck("myButton", "Test Malware! - WICAR.org", myelement, element, coords, driver);
		
		//for the forward, check if there is a title called "Virus/Spyware Download Blocked"
		myelement = driver.findElement(By.xpath("//*[@id=\"wsite-content\"]/div[3]/div/div/table/tbody/tr/td[1]/div[1]/a"));
		element = (Locatable) myelement;
		coords = element.getCoordinates();
		driver.getMouse().mouseMove(coords);
		
		//Letting popup load
		Thread.sleep(201);		
		
		driver.getMouse().mouseDown(coords); //clicks the bad link to go back to the warning page
		
		fronttest = warningPageCheck("myButton2", "Virus/Spyware Download Blocked", myelement, element, coords, driver);
		
		/*for the popup extension, will need:
		 *   test on/off switch, maybe by closing tab and opening it back up
		 *   test report buttons
		 *   test manual link check
		 */
		
		//goes to the popup page
		String EXTENSION_PROTOCOL = "chrome-extension";
		String EXTENSION_ID = "mcfboipgojocpcjknhkjiggdeldolbkd";
		String popupPage = EXTENSION_PROTOCOL + "://" + EXTENSION_ID + "/popup.html";
		
		driver.get(popupPage);
		
		//Test 1: Testing on/off switch
		popuptest1 = PopupTest1(driver, popupPage);
		
		//Test 2: Testing report buttons
		popuptest2 = PopupTest2(driver); //malware site
		driver.get(popupPage);
		popuptest3 = PopupTest3(driver); //phishing site
		driver.get(popupPage);

		//Test 3: Testing manual check button
		popuptest4 = PopupTest4(driver);
		
		//Test 4: Testing about button
		popuptest5 = PopupTest5(driver);
		
		
		//checks to see if all tests have passed.
		if (hovertest1 && hovertest2 && hovertest3 && hovertest3 && clicktest2 && backtest && popuptest1 && popuptest2 && popuptest3 && popuptest4 && popuptest5) {
			System.out.println("Test Successful");
		}else {
			System.out.println("Test Failed");
			System.out.println("hovertest1 = " + hovertest1);
			System.out.println("hovertest2 = " + hovertest2);
			System.out.println("hovertest3 = " + hovertest3);
			System.out.println("clicktest1 = " + clicktest1);
			System.out.println("clicktest2 = " + clicktest2);
			System.out.println("backtest = " + backtest);
			System.out.println("fronttest = " + fronttest);
			System.out.println("popuptest1 = " + popuptest1);
			System.out.println("popuptest2 = " + popuptest2);
			System.out.println("popuptest3 = " + popuptest3);
			System.out.println("popuptest4 = " + popuptest4);
		}
		
	}

	private static boolean PopupTest5(ChromeDriver driver) {
		WebElement about = driver.findElement(By.linkText("About the Extension"));
		about.click();
		if (driver.getCurrentUrl().equals("chrome-extension://mcfboipgojocpcjknhkjiggdeldolbkd/aboutPage/DescriptionPage.htm"))
			return true;
		return false;
	}

	//Testing manual link check
	private static boolean PopupTest4(ChromeDriver driver) throws InterruptedException {
		//check good link
		WebElement textbox = driver.findElement(By.id("manualLink"));
		textbox.sendKeys("http://en.wikipedia.org/wiki/Wiki");
		WebElement checkbtn = driver.findElement(By.id("linkcheckbtn"));
		checkbtn.click();
		WebDriverWait wait = new WebDriverWait(driver, 15, 100);
		wait.until(ExpectedConditions.alertIsPresent());
		Alert alert = driver.switchTo().alert();
		String alertMessage = driver.switchTo().alert().getText();
		Thread.sleep(1000);
		if (!alertMessage.equals("Nothing Found, Probably Safe")) {
			alert.accept();
			return false;
		}else {
			//check bad link
			driver.switchTo().alert().accept();
			textbox.clear();
			textbox.sendKeys("http://malware.wicar.org/data/eicar.com");
			checkbtn.click();
			wait.until(ExpectedConditions.alertIsPresent());
			alert = driver.switchTo().alert();
			alertMessage = driver.switchTo().alert().getText();
			Thread.sleep(1000);
			if(alertMessage.equals("Unsafe Link")) {
				alert.accept();
				return true;
			}
		}
		alert.accept();
		return false;
	}

	//Testing report Phish button
	private static boolean PopupTest3(ChromeDriver driver) throws InterruptedException {
		WebElement PhishButton = driver.findElement(By.id("reportPhish_btn"));
		PhishButton.click();
		Thread.sleep(2000);
		for (String newWindow : driver.getWindowHandles()) {
			driver.switchTo().window(newWindow);
		}
		if (driver.getTitle().equals("Report a Phishing Page"))
			return true;
		return false;
	}

	//Testing report malware button on the popup page
	private static boolean PopupTest2(ChromeDriver driver) throws InterruptedException {
		WebElement malButton = driver.findElement(By.id("reportMal_btn"));
		malButton.click();
		Thread.sleep(2000);
		for (String newWindow : driver.getWindowHandles()) {
			driver.switchTo().window(newWindow);
		}
		if (driver.getTitle().equals("Google Safe Browsing: Report a Malware Page"))
			return true;
		return false;
	}
	
	//Testing the on/off slider on popup
	public static boolean PopupTest1(ChromeDriver driver, String wbpage) {
		WebElement checkbox = driver.findElement(By.id("checkbox"));
		checkbox.click(); //should make the element off
		
		//opening the popup again in a new tab
		((JavascriptExecutor)driver).executeScript("window.open()");
		tabs = new ArrayList<String>(driver.getWindowHandles());
		driver.switchTo().window(tabs.get(1));
		driver.get(wbpage);
		driver.switchTo().window(tabs.get(0));
		driver.close();
		driver.switchTo().window(tabs.get(1));
		//checks if the toggle switch is unchecked
		checkbox = driver.findElement(By.id("checkbox"));

		if (checkbox.isSelected() == false) {
			//it successfully saved the user's option
			return true;
		}
		return false;
	}

	public static boolean warningPageCheck(String eleid, String title, WebElement myelement, Locatable element, Coordinates coords, ChromeDriver driver) {
		myelement = driver.findElement(By.id(eleid)); //finds the ignore warning or go back button
		element = (Locatable) myelement;
		coords = element.getCoordinates();
		driver.getMouse().click(coords); //clicks the ignore warning page
		if (driver.getTitle().contains(title)) {
			return true;
		}
		return false;
	}
}

