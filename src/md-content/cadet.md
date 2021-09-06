# CADET Captioning Tool

Once upon a time there was a tool called [MAGpie](http://ncam.wgbh.org/invent_build/web_multimedia/tools-guidelines/magpie) that would allow developers and other users to createe captions for online videos. It was fairly intuitive to use and it would allow you to craate captions as the video played that you could edit later when you review the captions.

Partly because of Apple's decision to discontinue support for [QuickTime for Java](https://www.wikiwand.com/en/QuickTime_for_Java) and partly because of lack of funding for NCAM to create a cross platform tool and partly because newer and better tools became available; NCAM discontinued support for MAGpie on Macintosh and don't think there is any newer version after 2.5.1 that will work cross platform.

In 2016, NCAM anounced the release of [CADET](http://ncamftp.wgbh.org/cadet/) (Caption And Description Editing Tool) as a cross platform tool to generatee captions in multiple formats.

## Install And Open

The requirements for CADET are:

- An Operating System that supports Node.js
- [Node.js](https://nodejs.org/en/). LTS 8.x suggested
- A modern web browser
- A copy of the [CADET repository](http://ncamftp.wgbh.org/cadet/cadet-eula.html)

Once you've accepted the EULA and downloaded the application, unzip the folder and open it. The rest will deppend on the platform.

**On Windows**

- Double-click **CADET Windows.bat**. CADET will launch in your default browser.
- Be patient: it can take a few seconds for CADET to launch on your default browser

**On Mac**

- Double-click **CADET Mac.command**. CADET will launch in your default browser.
- Be patient; it can take a few seconds for CADET to launch your browser
- If you see a warning that the application cannot be opened because it's from an unidentified developer, right-click (or `Ctrl+click`) on **CADET Mac.command**, choose Open from the menu and then choose Open from the dialog.

The final result should be similar regardless of the platform. It should look like the figure below:

<figure>
  <img src="images/cadet-main-screen.png" alt="Cadet main screen">
  <figcaption>Cadet main screen after running the startup script on a Mac</figcaption>
</figure>

## Getting Started

Now that we've got Cadet installed we can start working. The first thing we'll do is create a caption track for a video.

1. Open CADET and select Caption from the Project Type radio button group located at the top of the editing window. (You can also press `CTRL-D` to toggle between Caption and Description modes)
2. Open the File menu, and select open Media..., or press `CTRL-M`
3. In the Open Media File dialog, navigate to and select the media clip that you want to caption. This step is required in order to actually see captions in the player. Selecting the media clip will close the Open Media File dialog
4. Save the project by opening the File menu and choosing Save project, or press `CTRL-S`

Now we're ready to create the captions.

## Creating Caption tracks

A CADET project can contain captions or audio descriptions, but it cannot contain both. If you want to write descriptions for the video that you are also captioning, you must create a separate CADET project.

The process for creating description tracks is different. If you want more information check the CADET Website instructions for creating [Description Tracks](http://ncamftp.wgbh.org/cadet/help/describing.html).

### Creating captions

The process of captioning involves transcribing the audio into text snippets or captions and timing the captions to match the audio in the media clip. You can  transcribe large chunks of audio and then go back and time the captions. Other developers prefer to transcribe and time as they go.

Begin by transcribing caption text directly into CADET, or import an existing caption transcript into the editor.

#### Transcribe text into CADET

To transcribe captions directly into CADET, follow these steps.

1. Press `CTRL-spacebar` to start playing the media clip and listen to a bit of the audio
1. Pause the media player (`CTRL-spacebar`). Make sure the cursor is in the first cell of the "Caption" column and then type the caption that corresponds to the audio you just heard
1. Press the Enter key twice to insert a new caption row in the editor. The cursor will automatically be positioned in this new row
1. Press `CTRL-spacebar` to play the media clip again
1. Pause the player (`CTRL-spacebar`), transcribe and press the Enter key twice to create a new caption row
1. Repeat these steps until you are done transcribing either the entire clip or a section of the clip. When you reach the last caption, press the Enter key twice to insert a blank row at the bottom of the caption editor

#### Import a plain-text caption transcript into CADET

If you already have a plain-text transcription of the audio track, you can import this directly into CADET instead of transcribing into the editor. Be sure that the plain-text file has an extra carriage return or blank line between each new caption. Doing so will ensure that CADET imports each caption into a discrete cell in the editor. The following example shows how to format a plain-text file properly.

**You cannot import Word files into CADET**. If your transcript is saved in a Word document, save it as a plain-text file and then import that file into CADET.

To import the transcript into CADET, open the File menu, select Import and then Plain Text. Navigate to the text file you want to import, then select it. CADET will insert the text above the current row, pushing the current row and everything below it down further in the table

If the plain-text file that you want to import is formatted as a single paragraph of text, CADET will import the whole paragraph into a single cell of the editing table. You can then break this block of text into discrete captions by using the double-Enter feature of the editor: just position the cursor at the point in the text where you want to end one caption and begin another, then press the Enter key twice. This will insert a new caption row into the editor, and will also move the remaining text into this new row.

After you import the plain-text file (and format the text into captions, if necessary), assign timecodes to each caption.

#### Import an existing caption file into CADET

You can also import an existing caption file into CADET. CADET currently can import WebVTT, TTML, SRT and QTtext files. This is especially useful if you take advantage of automatic speech-to-text services, like YouTube's automatic captioning, and want to download and clean up the many errors in transcription and timing that are typically part of such services. Simply open the File menu, select Import and choose the appropriate file format. Note: CADET will only import text and timecodes from pre-existing caption files. It does not currently import any styling information or other markup.

After you import an existing caption file, you can re-edit or re-time the captions as necessary.

### Timing captions

Follow these steps to assign timecodes to each caption.

1. Rewind the media clip to the beginning
1. Put the cursor anywhere in the first caption cell
1. Play the clip by pressing CTRL-spacebar. When you hear the audio for the first caption, immediately press CTRL-comma. This will grab the timecode from the player at that instant and insert it into the "Start" cell for that caption, indicating the time at which that caption will appear on the screen. Note that CADET will automatically move its green focus box into the next caption cell, preparing it for the press of CTRL-comma
1. With the video still playing, press CTRL-comma when you hear the audio for the next caption
1. Continue to press CTRL-comma for each successive caption.
1. If there is a pause in the audio where no captions are necessary, press CTRL-period to insert an end time into the editor at the previous caption (because CADET will already have moved the cursor to the next row.) When the audio for the next caption is spoken, press CTRL-comma to insert a start time into the current caption.
1. When you reach the last caption in the editor, be sure to assign a final stop time to that caption by pressing CTRL-period.

### Reviewing captions

Once you have transcribed, edited and timed your caption project, review your work by following these steps.

1. Press the "Review" button at the top of the editor (or press CTRL-E to toggle from Edit to Review mode)
1. Rewind and play the video, and you will see captions displayed over the video in the player. If you see errors in the text, simply stop the video, make a correction, rewind a bit and play the video to see the corrected text in the player window
1. If you need to correct a timing error, simply position the video at the new spot in the timeline where you want the caption to appear, place the cursor in the appropriate cell in the caption editor and press CTRL-comma to insert the new timecode. (See the list of keyboard shortcuts for commands that will move the video playhead in small increments, giving you frame-accurate timing.)

Now you're ready to export a timed-text caption file for use with your target media player.

### Exporting captions

You've created captions or you've imported an existing timed-text file, and you've edited, timed and reviewed the captions using CADET's built-in media player. But CADET's player is not your ultimate target player. You're likely creating captions to be displayed on YouTube, Facebook or Vimeo; in an embedded browser player using HTML5's media elements (such as video and track); or in a custom Web-based player that you built yourself. In any case, you'll need to export the captions from CADET into a timed-text format that's suitable for your target browser or target media player.

To export your caption project, open the File menu and select Export....

CADET will display a file-save dialog for navigating to a directory, naming the file, and selecting the type of timed-text file to export. Select the timed-text format that you want from the Export Type drop-down list. (See the timed-text format table below for typical timed-text formats associated with browsers, video-hosting Web sites, and stand-alone applications.)

When you click the Save button, CADET will do some error checking (e.g., verifying timecode continuity) and if it passes the checks, CADET will export a file of the type requested, displaying an alert indicating the file location. (If CADET finds problems, the errors are listed in the Status box located directly below the media player. Each error is displayed as a clickable link which will take you directly to the caption with the problem.) The name of the exported file will be the same as the media clip you're using in your project, with an extension that corresponds to the type of export format that you selected. For example, if the media clip in the project is named "arthur.mp4", and if you want to export a WebVTT caption file, the name of the exported caption file would be "arthur.vtt", and it will be saved in the same location as the video clip.

### Caption Formats

<table class="formats" id="format_table">
	<caption>Timed-text formats and target players</caption>
		<tbody><tr>
			<th scope="col">Browser platform, <br> Web site or application</th>
			<th scope="col">Compatible<br>timed-text formats</th>
		</tr>
		<tr>
			<td class="rowhead">Internet Explorer (using HTML5 &lt;video&gt; element)</td>
			<td class="contentcell">
			<ul>
				<li>WebVTT</li>
				<li>TTML</li>
			</ul>
			</td>
		</tr>
		<tr>
			<td class="rowhead">Firefox, Chrome or Safari (using HTML5 &lt;video&gt; element)</td>
			<td class="contentcell">
			<ul>
				<li>WebVTT</li>
			</ul>
			</td>
		</tr>
		<tr>
			<td class="rowhead"><a href="https://support.google.com/youtube/answer/2734698?hl=en" target="_blank">YouTube</a></td>
			<td class="contentcell">
				<ul>
					<li>WebVTT</li>
					<li>TTML</li>
					<li>SRT</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td class="rowhead"><a href="https://www.facebook.com/help/261764017354370?helpref=faq_content" target="_blank">Facebook</a></td>
			<td class="contentcell">
				<ul>
					<li>SRT</li>
				</ul>
			</td>
		</tr>
		<tr>
			<td class="rowhead"><a href="https://help.vimeo.com/hc/en-us/articles/224968828-Captions-and-subtitles" target="_blank">Vimeo</a></td>
			<td class="contentcell">
				<ul>
					<li>WebVTT</li>
					<li>TTML</li>
					<li>SRT</li>
				</ul>
			</td>
		</tr>		<tr>
			<td class="rowhead">Quicktime Player</td>
			<td class="contentcell">
				<ul>
					<li>QTtext</li>
				</ul>
			</td>
		</tr>
	</tbody></table>
