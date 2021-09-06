<figure>
  <img src="https://javascript.info/article/settimeout-setinterval/settimeout-interval@2x.png">
  <figcaption>Using recursive setTimeout guarantees the interval will be the same between executions. Taken from <a href="https://javascript.info/settimeout-setinterval/">Scheduling: setTimeout and setInterval</a></figcaption>
</figure>

The example using setInterval does things differently. The interval we choose for setInterval includes the code we want to run in its execution. Let's say that the code takes 40 milliseconds to run, then the interval ends up being only 60 milliseconds.

<figure>
  <img src="https://javascript.info/article/settimeout-setinterval/setinterval-interval@2x.png">
  <figcaption>The interval we set for setInterval includes our own code execution. Taken from <a href="https://javascript.info/settimeout-setinterval/">Scheduling: setTimeout and setInterval</a></figcaption>
</figure>
