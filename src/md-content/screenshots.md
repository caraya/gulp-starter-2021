# Generating screenshots

I'm documenting behaviors that I take for granted and then forget just when I need them. The question is **How do I generate screenshots of what I'm working on?**

The answer is ***It depends***

How to generate screenshots will depend on what tool you're using. Both Windows and Macintosh systems offer you ways to generate files from screen shots and, surprise to me, Chrome DevTools will let you do it too

## Windows 10

Windows 10 gives you two options too capture screen shots. Which one you use will depend on whether you need to keep a file of the screenshot for later use.

Pressing `Print Screen` copies the current screen to the clipboard and allows you to paste into the program you need it in (I've used this in Word and Photoshop).

Press the `Windows` + `Print Screen` buttons on your keyboard to save the screen to a file. You can then open the file in Photoshop or insert it into a Word document or where you need it.

## Macintosh

Macintosh also provides two different ways to do screen captures. They are not the same as the Windows version as they will both generate a file.

`Command + Shift + 3` will generate a full screen shot of whatever is visible on the screen at the time. Make sure you hide applications or any material that you don't want to see on the screen shoot.

`Command + Shift + 4` will give you a selection cursor that you can use to select the area you want to capture.

Both commands will generate PNG files and save them to the desktop by default. You can then process them as needed.

## Chrome DevTools

Much too my surprise Chrome DevTools also provide a way to generate screenshots, some of them being exclusive too how a browser works.

This also has the advantage that it's cross platform. It'll work everywhere Chrome does.

Open DevTools (`Control + Shift + I` on Windows / `Command + Option + I` on Mac) then open the command palette  `Control / Command + Shift + P` and type `screenshot`. You will get something similar to the image below

<figure>
  <img src="https://publishing-project.rivendellweb.net/wp-content/uploads/2019/08/chrome-screen-shot-capture.png">
  <figcaption></figcaption>
</figure>

`Capture area screenshot`  is similar to the Macintosh `Command + Option + 4` where it let's you select the area of the scrreen to

`Capture full size screenshoot` is a little counterintuitive. It will not capture a full screen size shot of your page but the entire pare, no matter how long long it is.

`Capture node screenshot` will make a screenshot of whatever node you have selected in the elements panel.

Finally, `Capture screenshot` will do a full-screen screenshot like we would expect.


