# LoginRadius React Demo
## How to Run
**Required: NPM installed** (Link [here](https://nodejs.org/en/download/) to download)
1. configure the file ``./src/utils/config.json`` to match your credentials.  **You must have every field present in that file.  If not, it could cause unexpected behaviour.**
1. On terminal or any command prompt run:
   1.  ``` cd to directory ```
   2.  ``` npm install ```
   2.  ``` npm start ```

## Noted Differences between Plain-HTML/CSS/JS & React:
* ### Invoking the LoginRadiusV2 Singleton:
  
  *  **Problem:** Since the object is imported through our index.html, it is on the "DOM" while React serves on a "Virtual DOM"
  
  *  **Solution**: To invoke the LoginRadiusV2 you'll need to use:
  ``` let LRObject = window.LoginRadiusV2``` as shown in *./src/utils/getLoginObject.js* (or var if you're not in ES6)

* ### Deploying the preset interfaces on the Virtual DOM:
  * **Problem:** Writing the methods correctly, the LR interfaces do not deploy on the DOM properly (It does not deploy at all)

  * **Solution**: Get rid of the ```LRObject.util.ready``` wrapper.

  * **Example**:
 ``` 
// BEFORE //
LRObject.util.ready(function() {
    LRObject.init('registration',registration_options);
}
// AFTER //
LRObject.init('registration',registration_options);
  ```
  * This will not cause unexpected errors as long as you have the methods to initialize the LR options in your *componentDidMount* method

* ### Deploying the Social Login Interface on the Virtual DOM:
  * **Problem:** The Social Login Interface references a class on the DOM, the method will not be able to find "classes" on React.

  * **Solution:** On the Social Login component, reference it using "className" instead of "class"
  * **Example:**
```
// BEFORE //
<div id="interfacecontainerdiv" class="interfacecontainerdiv"></div>
// AFTER //
<div id="interfacecontainerdiv" className="interfacecontainerdiv"></div>
```




