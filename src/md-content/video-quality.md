# Best way to measure performance

From: <https://superuser.com/questions/338725/compare-two-video-files-to-find-out-which-has-best-quality>

<p>I work in video quality research, and it's hard to give a simple answer to your question. What you want is a program that gives you a <a href="http://en.wikipedia.org/wiki/Mean_opinion_score" rel="nofollow noreferrer">Mean Opinion Score</a> (MOS) of a video, i.e. a number between 1 and 5, or between 0 and 100, which corresponds to the quality as perceived by a human being.</p>
<h3>Why you cannot simply compare bitrate/resolution/etc.</h3>
<p>Just comparing video resolution won't tell anything about the quality. In fact, it may be completely misleading. A 1080p movie rip at 700MB size might look worse than a 720p rip at 700MB, because for the former, the bitrate is too low, which introduces all kinds of compression artifacts.</p>
<p>The same goes for comparing bitrate at similar frame sizes, as different encoders can actually deliver better quality at less bitrate, or vice-versa. For example, a 720p 700MB rip produced with XviD will look worse than a 700MB rip produced with x264, because the latter is much more efficient.</p>
<p>You would also have to define how a final "integral score" (the MOS) is composed of the individual quality factors. This <em>heavily</em> depends on several things, including but not limited to:</p>
<ul>
<li>the type of videos you are comparing (cartoons, movies, news, etc.)</li>
<li>their length</li>
<li>their viewing audience</li>
<li>their original frame size</li>
<li>their original "quality" before they were encoded</li>
</ul>
<p>We're not even talking about how humans would perceive the videos.  Let's assume you have a friend who is watching movies because he or she enjoys crisp details and high motion resolution. They would be much more critical when seeing a low quality rip than a friend who is just watching movies for <em>their content</em>. They probably would not care about the quality so much, as long as the movie is funny or entertaining.</p>
<h3>There are different types of video quality metrics!</h3>
<p>Let me give you a list of what I think of is most commonly used for basic evaluation of video quality today. There exist several video quality metrics, which can be classified according to which kind of information is used to determine the quality. In principle and very simply speaking, you distinguish between the following:</p>
<ul>
<li><p><strong>No-reference metrics</strong> – They just have one video as input and output a quality score. In your case you are looking for a <em>no-reference metric</em>, because you often do not even have the original video. Such a metric will take one video and output one quality score. Here are <a href="http://vq.kt.agh.edu.pl/metrics.html" rel="nofollow noreferrer">some examples</a> of problems a NR metric will detect (e.g. blurring).</p>
</li>
<li><p><strong>Full-reference metrics</strong> – They have two inputs, one being the original input video and the other being the encoded video. For example, you could take a DVD movie, then create two rips from it, and use a full-reference metric to estimate the quality loss between the original DVD movie (i.e. the MPEG-2 video on the disc) and your rips. This will take a long time to compute, but it's more accurate.</p>
</li>
</ul>
<p>The above metrics look at video coding quality, but there are also metrics that incorporate problems like initial loading times and stalling events when streaming video (e.g. <a href="https://github.com/itu-p1203/itu-p1203/" rel="nofollow noreferrer">ITU-T P.1203</a>).</p>
<h3>What software can I use?</h3>
<p>Here is a list of ready-to-use tools that you can use to test some metrics (some are for Windows only):</p>
<ul>
<li><a href="https://github.com/Netflix/vmaf" rel="nofollow noreferrer">VMAF – Video Multi-Method Assessment Fusion</a> by Netflix (more info <a href="http://techblog.netflix.com/2016/06/toward-practical-perceptual-video.html" rel="nofollow noreferrer">here</a>)</li>
<li><a href="http://mmspg.epfl.ch/vqmt" rel="nofollow noreferrer">VQMT – Video Quality Measurement Tool</a> by the EPFL in Lausanne, Switzerland</li>
<li><a href="http://compression.ru/video/quality_measure/info_en.html#start" rel="nofollow noreferrer">MSU Video Quality Tool</a>, a commercial software</li>
<li><a href="https://github.com/itu-p1203/itu-p1203/" rel="nofollow noreferrer">ITU-T P.1203 Implementation</a> for analysis of HTTP streaming quality</li>
<li><a href="https://github.com/Telecommunication-Telemedia-Assessment/bitstream_mode3_p1204_3" rel="nofollow noreferrer">ITU-T P.1204.3 Implementation</a> for analysis of H.264, H.265 and VP9-encoded bitstreams</li>
<li><a href="https://github.com/fifonik/FFMetrics" rel="nofollow noreferrer">FFMetrics</a>, a Windows GUI for several video quality metrics available in FFmpeg</li>
</ul>
<p>Now what metrics are there?</p>
<h3>PSNR, PSNR-HVS and PSNR-HVS-M</h3>
<p>For starters, <a href="http://en.wikipedia.org/wiki/PSNR" rel="nofollow noreferrer">PSNR</a> (Peak Signal-to-Noise Ratio) is a very simple-to-use but somewhat poor method of assessing video quality. It works relatively well though for most applications, but it does not give a good estimation of how humans would perceive the quality.</p>
<p>PSNR can be calculated frame-by-frame, and then you would for example average the PSNR of a whole video sequence to get the final score. Higher PSNR is better.</p>
<p>PSNR-HVS and PSNR-HVS-M are extensions of PSNR that try to emulate human visual perception, so they should be more accurate. <a href="http://mmspg.epfl.ch/vqmt" rel="nofollow noreferrer">VQMT</a> and <a href="http://compression.ru/video/quality_measure/info_en.html#start" rel="nofollow noreferrer">MSU</a> can calculate PSNR, PSNR-HVS and PSNR-HVS-M between two videos.</p>
<h3>SSIM, MS-SSIM</h3>
<p><a href="http://en.wikipedia.org/wiki/SSIM" rel="nofollow noreferrer">Structural Similarity</a> (SSIM) is as easy to calculate as PSNR, and it delivers more accurate results, but still on a frame-by-frame basis. You will find some implementations under the Wikipedia link, or you can use <a href="http://mmspg.epfl.ch/vqmt" rel="nofollow noreferrer">VQMT</a> or <a href="http://compression.ru/video/quality_measure/info_en.html#start" rel="nofollow noreferrer">MSU</a>. These tools also include MS-SSIM, which gives better (i.e., more representative) results than SSIM, as well as a few other derivatives.</p>
<p>The results should be similar to PSNR. Again, you need to compare a reference to a processed video for this to work, and both videos should be of the same size.</p>
<h3>VMAF</h3>
<p><a href="https://github.com/Netflix/vmaf" rel="nofollow noreferrer">Video Multi-Method Assessment Fusion</a> by Netflix is a set of tools to calculate video quality based on some existing metrics, which are then fused by machine learning methods into a final score between 0 and 100. Netflix have <a href="http://techblog.netflix.com/2016/06/toward-practical-perceptual-video.html" rel="nofollow noreferrer">explained the whole thing here</a>:</p>
<blockquote>
<p>[VMAF] predicts subjective quality by combining multiple elementary quality metrics. The basic rationale is that each elementary metric may have its own strengths and weaknesses with respect to the source content characteristics, type of artifacts, and degree of distortion. By ‘fusing’ elementary metrics into a final metric using a machine-learning algorithm - in our case, a Support Vector Machine (SVM) regressor - which assigns weights to each elementary metric, the final metric could preserve all the strengths of the individual metrics, and deliver a more accurate final score.</p>
</blockquote>
<p>You can also <a href="http://ffmpeg.org/ffmpeg-filters.html#libvmaf" rel="nofollow noreferrer">use <code>ffmpeg</code> to calculate VMAF scores</a>.</p>
<h3>VQM</h3>
<p>The <a href="http://www.its.bldrdoc.gov/resources/video-quality-research/software.aspx" rel="nofollow noreferrer">Video Quality Metric</a> was validated in the <a href="http://www.its.bldrdoc.gov/vqeg/" rel="nofollow noreferrer">Video Quality Experts Group</a> (VQEG) and is a very good full-reference algorithm. You can download VQM for free or use the implementation from MSU.</p>
<p>When you register and download, you want to use the <em>NTIA General Model</em> or the <em>Video Quality Model with Variable Frame Delay</em>.</p>
<h3>ITU P.1204.3</h3>
<p>This is an ITU-T standard for bitstream-based evaluation of video quality. It is a short term video quality prediction model that uses full bitstream data to estimate video quality scores on a segment level (for segments of ~10 seconds length).</p>
<p>A reference implementation can be <a href="https://github.com/Telecommunication-Telemedia-Assessment/bitstream_mode3_p1204_3" rel="nofollow noreferrer">found on GitHub</a>.</p>
<h3>Other Metrics</h3>
<ul>
<li><a href="http://en.wikipedia.org/wiki/PEVQ" rel="nofollow noreferrer">PEVQ</a> is a standardized full-reference metric under ITU-T J.246. It aims at multimedia signals, but not HD video.</li>
<li><a href="http://en.wikipedia.org/wiki/VQuad-HD" rel="nofollow noreferrer">VQuad-HD</a> is another full-reference metric standardized as ITU-T J.341. Since it's newer, its better suited for HD video.</li>
</ul>
<p>Both of them are commercial solutions and you'll not find a software to download for them.</p>
<p>There are also some ITU standards on no-reference metrics, such as <a href="http://www.itu.int/rec/T-REC-P.1201/en" rel="nofollow noreferrer">ITU-T P.1201</a> and <a href="http://www.itu.int/rec/T-REC-P.1202/en" rel="nofollow noreferrer">ITU-T P.1202</a>, which work with parameters from the bitstream for IPTV streaming. <a href="http://www.itu.int/rec/T-REC-P.1203" rel="nofollow noreferrer">ITU-T P.1203</a> can be used for adaptive streaming cases.</p>
<hr>
<h3>Summary</h3>
<p>If you just seek to compare simple objectively measurable criteria like:</p>
<ul>
<li>Frame size</li>
<li>Bit rate</li>
<li>Frames per second</li>
<li>Video resolution</li>
</ul>
<p>…&nbsp;a simple call to <code>ffmpeg -i</code> should give you all the details you need at the beginning. Also have a look at the <code>-vstats</code> option. You could then summarize this in a spreadsheet. Note that when you encode videos, <code>x264</code> for example will log stuff like PSNR straight to a file if you need to, so you can use these values later.</p>
<p>As for how to weigh these criteria, you should probably emphasize the bit rate – but only if you know that the codec is the same. You could generally say that when both videos use x264, the one with higher bitrate is better. Even more generally, you should choose a lower resolution when you have two videos with the same bitrate, since the degradation due to upscaling is not as bad as the degradation due to low bitrate.</p>
<p>Comparing different codecs according to their bit rate is <em>not possible</em> unless you know more about the content and the individual encoding settings. Frame rate is a very subjective thing too and should be counted into your measurements if it is well below 25 Hz.</p>
<p>To summarize, heavily emphasize the bitrate if it's the only thing you have. Don't forget to use your eyes, too :)</p>
</div>
