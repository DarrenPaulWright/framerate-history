# Framerate History

> An ES6 class for tracking framerate for a given period of time.
>
> [![npm][npm]][npm-url]
[![deps][deps]][deps-url]
[![size][size]][size-url]
[![vulnerabilities][vulnerabilities]][vulnerabilities-url]
[![license][license]][license-url]


<br><a name="Installation"></a>

## Installation
```
npm install framerate-history
```

<br><a name="FrameRate"></a>

## FrameRate
``` javascript
import FrameRate from 'framerate-history';
```

* [FrameRate](#FrameRate)
    * [new FrameRate(settings)](#new_FrameRate_new)
    * [.fps](#FrameRate+fps) ⇒ <code>Number</code>
    * [.history](#FrameRate+history) ⇒ <code>Array</code>
    * [.filterStrength([value])](#FrameRate+filterStrength) ⇒ <code>Number</code>
    * [.sampleRate([value])](#FrameRate+sampleRate) ⇒ <code>Number</code>
    * [.onSample([callback])](#FrameRate+onSample) ⇒ <code>function</code>
    * [.historyDuration([value])](#FrameRate+historyDuration) ⇒ <code>Number</code>


<br><a name="new_FrameRate_new"></a>

### new FrameRate(settings)

| Param | Type | Default |
| --- | --- | --- |
| settings | <code>Object</code> |  | 
| [settings.onSample] | <code>function</code> |  | 
| [settings.filterStrength] | <code>Number</code> | <code>5</code> | 
| [settings.historyDuration] | <code>Number</code> | <code>30</code> | 
| [settings.sampleRate] | <code>Number</code> | <code>10</code> | 


<br><a name="FrameRate+fps"></a>

### frameRate.fps ⇒ <code>Number</code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_`🔒 Read only`_

> The last recorded FPS


<br><a name="FrameRate+history"></a>

### frameRate.history ⇒ <code>Array</code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_`🔒 Read only`_

> The FPS recordings over the history duration


<br><a name="FrameRate+filterStrength"></a>

### frameRate.filterStrength([value]) ⇒ <code>Number</code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_`🔗 Chainable`_

> Sets a filter on the frame rate calculation. Setting to 1 will effectively turn off the filter, the higher the
> number the more smooth the curve over time. See this stackoverflow question for details:
> https://stackoverflow.com/questions/4787431/check-fps-in-js

**Default**: <code>5</code>  

| Param | Type |
| --- | --- |
| [value] | <code>Number</code> | 


<br><a name="FrameRate+sampleRate"></a>

### frameRate.sampleRate([value]) ⇒ <code>Number</code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_`🔗 Chainable`_

> The rate to take samples. Setting to 0 will clear the interval. If the interval is prevented from executing at the desired rate, the history will get filled in with the current frame rate in an attempt to keep the history as accurate as possible.

**Default**: <code>10</code>  

| Param | Type | Description |
| --- | --- | --- |
| [value] | <code>Number</code> | Samples per second |


<br><a name="FrameRate+onSample"></a>

### frameRate.onSample([callback]) ⇒ <code>function</code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_`🔗 Chainable`_

> The callback will get called for every sample taken.


| Param | Type | Description |
| --- | --- | --- |
| [callback] | <code>function</code> | The callback is given one param, the FPS history array. |


<br><a name="FrameRate+historyDuration"></a>

### frameRate.historyDuration([value]) ⇒ <code>Number</code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_`🔗 Chainable`_

> Defines the duration of tracked history.

**Default**: <code>30</code>  

| Param | Type | Description |
| --- | --- | --- |
| [value] | <code>Number</code> | Seconds |


[npm]: https://img.shields.io/npm/v/framerate-history.svg
[npm-url]: https://npmjs.com/package/framerate-history
[deps]: https://david-dm.org/darrenpaulwright/framerate-history.svg
[deps-url]: https://david-dm.org/darrenpaulwright/framerate-history
[size]: https://packagephobia.now.sh/badge?p&#x3D;framerate-history
[size-url]: https://packagephobia.now.sh/result?p&#x3D;framerate-history
[vulnerabilities]: https://snyk.io/test/github/DarrenPaulWright/framerate-history/badge.svg?targetFile&#x3D;package.json
[vulnerabilities-url]: https://snyk.io/test/github/DarrenPaulWright/framerate-history?targetFile&#x3D;package.json
[license]: https://img.shields.io/github/license/DarrenPaulWright/framerate-history.svg
[license-url]: https://npmjs.com/package/framerate-history/LICENSE.md
