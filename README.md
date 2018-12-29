# framerate-history
[![npm][npm]][npm-url]
[![deps][deps]][deps-url]
[![size][size]][size-url]

An ES6 class for tracking frame rate for a given period of time.

## Installation
```
npm install framerate-history;
```

<a name="module_FrameRate"></a>

## FrameRate
### Usage```import FrameRate from 'framerate-history';```


| Param | Type |
| --- | --- |
| settings | <code>Object</code> | 
| settings.onSample | <code>function</code> | 
| settings.filterStrength | <code>Number</code> | 
| settings.historyDuration | <code>Number</code> | 
| settings.sampleRate | <code>Number</code> | 


* [FrameRate](#module_FrameRate)
    * [.fps](#module_FrameRate+fps) : <code>number</code>
    * [.history](#module_FrameRate+history) : <code>array</code>
    * [.filterStrength([value])](#module_FrameRate+filterStrength) ⇒ <code>frameRate</code> \| <code>Number</code>
    * [.sampleRate([value])](#module_FrameRate+sampleRate) ⇒ <code>frameRate</code> \| <code>Number</code>
    * [.onSample([callback])](#module_FrameRate+onSample) ⇒ <code>frameRate</code> \| <code>function</code>
    * [.historyDuration([value])](#module_FrameRate+historyDuration) ⇒ <code>frameRate</code> \| <code>Number</code>

<a name="module_FrameRate+fps"></a>

### frameRate.fps : <code>number</code>
**Kind**: instance property of [<code>FrameRate</code>](#module_FrameRate)  
<a name="module_FrameRate+history"></a>

### frameRate.history : <code>array</code>
**Kind**: instance property of [<code>FrameRate</code>](#module_FrameRate)  
<a name="module_FrameRate+filterStrength"></a>

### frameRate.filterStrength([value]) ⇒ <code>frameRate</code> \| <code>Number</code>
Sets a filter on the frame rate calculation. Setting to 1 will effectively turn off the filter, the higher the number the more smooth the curve over time. See this stackoverflow question for details: https://stackoverflow.com/questions/4787431/check-fps-in-js

**Kind**: instance method of [<code>FrameRate</code>](#module_FrameRate)  

| Param | Type |
| --- | --- |
| [value] | <code>Number</code> | 

<a name="module_FrameRate+sampleRate"></a>

### frameRate.sampleRate([value]) ⇒ <code>frameRate</code> \| <code>Number</code>
The rate to take samples (samples per second). Setting to 0 will clear the interval.

**Kind**: instance method of [<code>FrameRate</code>](#module_FrameRate)  

| Param | Type |
| --- | --- |
| [value] | <code>Number</code> | 

<a name="module_FrameRate+onSample"></a>

### frameRate.onSample([callback]) ⇒ <code>frameRate</code> \| <code>function</code>
The callback will get called for every sample taken.

**Kind**: instance method of [<code>FrameRate</code>](#module_FrameRate)  

| Param | Type |
| --- | --- |
| [callback] | <code>function</code> | 

<a name="module_FrameRate+historyDuration"></a>

### frameRate.historyDuration([value]) ⇒ <code>frameRate</code> \| <code>Number</code>
Defines the duration of tracked history in seconds.

**Kind**: instance method of [<code>FrameRate</code>](#module_FrameRate)  

| Param | Type |
| --- | --- |
| [value] | <code>Number</code> | 


## License

[MIT](./LICENSE.md)

[npm]: https://img.shields.io/npm/v/framerate-history.svg
[npm-url]: https://npmjs.com/package/framerate-history
[deps]: https://david-dm.org/darrenpaulwright/framerate-history.svg
[deps-url]: https://david-dm.org/darrenpaulwright/framerate-history
[size]: https://packagephobia.now.sh/badge?p=framerate-history
[size-url]: https://packagephobia.now.sh/result?p=framerate-history
