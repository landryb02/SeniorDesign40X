package co.killthephish.selenium.test;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.interactions.internal.Coordinates;
import org.openqa.selenium.interactions.internal.Locatable;
import org.openqa.selenium.remote.DesiredCapabilities;

public class SeleniumTest {
	//Disclaimer, I know this code looks bad, I'll fix it up when I get the chance
	
	static String text;
	//needs to move out of a link in order to change whether the link is safe or not
	public static boolean movetoContents(WebElement myelement, ChromeDriver driver, Locatable element, Coordinates coords, String visibility) {
		myelement = driver.findElement(By.id("mw-toc-heading"));
		element = (Locatable) myelement;
		coords = element.getCoordinates();
		driver.getMouse().mouseMove(coords);
		//System.out.println("moved mouse to contents");
		//checks the visibility and sees if it matches what it should
		visibility = driver.findElement(By.id("popup")).getCssValue("visibility");
		//System.out.println(visibility);
		if (visibility.equals("hidden")) {
			return true;
		}else {
			return false;
		}
	}
	
	public static boolean movetoComputerDisplay(WebElement myelement, ChromeDriver driver, Locatable element, Coordinates coords, String visibility) {
		//moves the mouse to a specified link on the page
		myelement = driver.findElement(By.linkText("computer display"));
		element = (Locatable) myelement;
		coords = element.getCoordinates();
		driver.getMouse().mouseMove(coords);
		//System.out.println("moved mouse to a link");
		//checks the popup text and visibility and sees if it matches what it should
		text = driver.findElement(By.id("popup")).getText();
		//System.out.println(text);
		visibility = driver.findElement(By.id("popup")).getCssValue("visibility");
		//System.out.println(visibility);
		if (text.equals("Link is Safe") && visibility.equals("visible")) {
			return true;
		}else {
			return false;
		}	
	}
	
	private static boolean movetoContentFormats(WebElement myelement, ChromeDriver driver, Locatable element,
			Coordinates coords, String visibility) {
		//move the mouse to another link
				myelement = driver.findElement(By.linkText("content formats"));
				element = (Locatable) myelement;
				coords = element.getCoordinates();
				driver.getMouse().mouseMove(coords);
				//System.out.println("moved mouse to content formats link");
				
				//checks the popup text and visibility and sees if it matches what it should
				text = driver.findElement(By.id("popup")).getText();
				//System.out.println(text);
				visibility = driver.findElement(By.id("popup")).getCssValue("visibility");
				//System.out.println(visibility);
				if (text.equals("WARNING: Link Unsafe") && visibility.equals("visible")) {
					//mousedown on the link to try to activate our extension's click function
					driver.getMouse().mouseDown(coords);
					//System.out.println("mousedowned link");
					return true;
				}else {
					return false;
				}
	}

	public static void main(String[] args) throws InterruptedException {
		
		//Test variables
		boolean hovertest1 = false;
		boolean hovertest2 = false;
		boolean hovertest3 = false;
		boolean hovertest4 = false;
		boolean hovertest5 = false;
		boolean clicktest1 = false;
		boolean clicktest2 = false;
		boolean backtest = false;
		boolean fronttest = false;

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
		if (text.equals("Link is Safe") && visibility.equals("visible")) {
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
		
		hovertest3 = movetoComputerDisplay(myelement, driver, element, coords, visibility);
		
		hovertest4 = movetoContents(myelement, driver, element, coords, visibility);
		
		String previousTitle = driver.getTitle();
		
		hovertest5 = movetoContentFormats(myelement, driver, element, coords, visibility);
		

		//check the title of the current page that the test is on to see if our extension worked as it should
		if (driver.getTitle().contains("Warning")) {
			clicktest2 = true;
		}
		
		//now I need to test the forward/back buttons on the warning page
		//back first
		myelement = driver.findElement(By.id("myButton"));
		element = (Locatable) myelement;
		coords = element.getCoordinates();
		driver.getMouse().click(coords);
		//Test for the previous title of page
		if (driver.getTitle().equals(previousTitle)) {
			backtest = true;
		}
		
		hovertest3 = movetoComputerDisplay(myelement, driver, element, coords, visibility);
		
		hovertest4 = movetoContents(myelement, driver, element, coords, visibility);
		
		String ForwardURL = driver.findElement(By.linkText("content formats")).getAttribute("href");
		
		hovertest5 = movetoContentFormats(myelement, driver, element, coords, visibility);
		//need to get the forward button
		myelement = driver.findElement(By.id("myButton2"));
		element = (Locatable) myelement;
		coords = element.getCoordinates();
		driver.getMouse().click(coords);
		//Test for the previous title of page
		if (driver.getCurrentUrl().contains(ForwardURL)) {
			fronttest = true;
		}
		
		//checks to see if all tests have passed.
		if (hovertest1 && hovertest2 && hovertest3 && hovertest3 && hovertest4 && hovertest5 && clicktest2 && backtest) {
			System.out.println("Test Successful");
		}else {
			System.out.println("Test Failed");
			System.out.println("hovertest1 =" + hovertest1);
			System.out.println("hovertest2 =" + hovertest2);
			System.out.println("hovertest3 =" + hovertest3);
			System.out.println("hovertest4 =" + hovertest4);
			System.out.println("hovertest5 =" + hovertest5);
			System.out.println("clicktest1 =" + clicktest1);
			System.out.println("clicktest2 =" + clicktest2);
			System.out.println("backtest =" + backtest);
			System.out.println("fronttest =" + fronttest);
		}
		
	}

}

