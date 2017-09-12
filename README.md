[logo]: http://aping.io/logo/320/aping-plugin.png "apiNG Plugin"
![apiNG][logo]

[![Join the chat at https://gitter.im/JohnnyTheTank/apiNG](https://img.shields.io/badge/GITTER-join%20chat-green.svg)](https://gitter.im/JohnnyTheTank/apiNG?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![npm version](https://badge.fury.io/js/aping-plugin-wikipedia.svg)](https://badge.fury.io/js/aping-plugin-wikipedia)
[![Bower version](https://badge.fury.io/bo/apiNG-plugin-wikipedia.svg)](https://badge.fury.io/bo/apiNG-plugin-wikipedia)

**_apiNG-plugin-wikipedia_** is a [wikipedia API](https://www.mediawiki.org/wiki/API:Main_page/en) plugin for [**apiNG**](https://github.com/JohnnyTheTank/apiNG).

# Information
* **Supported apiNG models: `social`**
* This plugin supports the [`get-native-data` parameter](https://aping.readme.io/docs/advanced#parameters)
* Used promise library: [angular-wikipedia-api-factory](https://github.com/JohnnyTheTank/angular-wikipedia-api-factory) _(included in distribution files)_

# Documentation
1. [INSTALLATION](#1-installation)
    1. Get file
    2. Include file
    3. Add dependency
    4. Add plugin
2. [USAGE](#2-usage)
    1. Models
    2. Requests

## 1. INSTALLATION

### I. Get file
Install via either [bower](http://bower.io/), [npm](https://www.npmjs.com/), CDN (jsDelivr) or downloaded files:

* `bower install apiNG-plugin-wikipedia --save`
* `npm install aping-plugin-wikipedia --save`
* use [CDN file](https://www.jsdelivr.com/projects/aping.plugin-wikipedia)
* download [apiNG-plugin-wikipedia.zip](https://github.com/JohnnyTheTank/apiNG-plugin-wikipedia/zipball/master)

### II. Include file
Include `aping-plugin-wikipedia.min.js` in your apiNG application

```html
<!-- when using bower -->
<script src="bower_components/apiNG-plugin-wikipedia/dist/aping-plugin-wikipedia.min.js"></script>

<!-- when using npm -->
<script src="node_modules/aping-plugin-wikipedia/dist/aping-plugin-wikipedia.min.js"></script>

<!-- when using cdn file -->
<script src="//cdn.jsdelivr.net/npm/aping-plugin-wikipedia@latest/dist/aping-plugin-wikipedia.min.js"></script>

<!-- when using downloaded files -->
<script src="aping-plugin-wikipedia.min.js"></script>
```


### III. Add dependency
Add the module `jtt_aping_wikipedia` as a dependency to your app module:
```js
angular.module('app', ['jtt_aping', 'jtt_aping_wikipedia']);
```

### IV. Add the plugin
Add the plugin's directive `aping-wikipedia="[]"` to your apiNG directive and [configure your requests](#ii-requests)
```html
<aping
    template-url="templates/social.html"
    model="social"
    items="20"
    aping-wikipedia="[{'search':'germany'}]">
</aping>
```

## 2. USAGE

### I. Models
Supported apiNG models

|  model   | content | support | max items<br>per request | (native) default items<br>per request |
|----------|---------|---------|--------|---------|
| `social` | **articles** | full    | `500`   | `10`   |

**support:**
* full: _the source platform provides a full list with usable results_ <br>
* partly: _the source platfrom provides just partly usable results_


### II. Requests
Every **apiNG plugin** expects an array of **requests** as html attribute.

#### Get Article by Name
|  parameter  | sample | default | description | optional |
|----------|---------|---------|---------|---------|
| **`title`** | `Association football` |  | Existing wikipedia page | no |
| **`language`**  | `de` | `en` | Shorthandle of existing wikipedia project |  yes  |

Sample requests:
* `[{'title':'International System of Units'}, {'title':'Metrication in the United States'}]`
* `[{'title':'Metrologie', 'language':'de'}]`

#### Search Articles
|  parameter  | sample | default | description | optional |
|----------|---------|---------|---------|---------|
| **`search`** | `soccer` |  | Text to search | no |
| **`textSearch`**  | `true` | `false` | Search in title and content |  yes  |
| **`items`**  | `25` | `10` | Items per request (`0`-`500`) |  yes  |
| **`language`**  | `de` | `en` | Shorthandle of existing wikipedia project |  yes  |


Sample requests:
* `[{'search':'fc bayern'}, {'search':'read madrid'}]`
* `[{'search':'ozean', 'textSearch':'true', 'items':20, 'language':'de' }]`

# Licence
MIT
