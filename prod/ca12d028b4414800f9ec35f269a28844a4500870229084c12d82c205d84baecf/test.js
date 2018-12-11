// window.IWVA_moduleInitArr = window.IWVA_moduleInitArr || [];
// function checkAndRunLotFunction() {
// if (typeof IWChat !== "undefined" && typeof IWChat.run !== "undefined") {
// IWChat.run()
// }
// }
// window.IWVA_moduleInitArr.push(checkAndRunLotFunction);

// iw.ServerCallback.prototype.callback = function callback(p152, p153) {
//     if (!p152) return;
//     if (!this.m166.hasFocus()) {
//         this._f4("locked callback for token: ", p152, 'focus id: ', this.m175);
//         return;
//     }
//     if (this.m178[p152]) {
//         clearTimeout(this.m178[p152]);
//         delete this.m178[p152];
//     }
//     switch (parseInt(p153)) {
//         case 1:
//             if (this.m177[p152] && this.m177[p152].parentNode == this.m37 && this.m180) {
//                 this.m180.call(null, p152);
//                 this.m37.removeChild(this.m177[p152]);
//                 delete this.m177[p152];
//             }
//             break
//         case 0:
//             if (this.m177[p152] && this.m177[p152].parentNode == this.m37) {
//                 this.m37.removeChild(this.m177[p152]);
//                 delete this.m177[p152];
//                 this.pull(p152);
//             }
//             break;
//         case -1:
//           this._f4("invalid token: ", p152);
//           var isLc = objICHR_InteliwiseSaaSModule.core.factory.getObserverById('iw-module-wrapper').getElement().classList.contains('iw-live-chat');
//           if(typeof window.IWVA_showWelcome === 'function' && !isLc) {
//           window.IWVA_showWelcome();
//           }
//            break;

//     }
// }


// var IWVA_setResponse = (function () {
// 'use strict';
// var IS_NUMBER = 'IWVA_SET_RESPONSE_IS_NUMBER';
// var arr = [];
// replaceSetResponse();
// function isEqualOrRegexMatch(patternProp, objProp) {
// var isRegex = patternProp instanceof RegExp;
// var v211 = objProp && objProp.match && typeof objProp.match === 'function';
// if (isRegex && v211) {
// return !!objProp.match(patternProp);
// }
// if (isRegex) {
// return false;
// }
// if (typeof patternProp === 'object') {
// return isObjectContain(patternProp, objProp)
// }
// if (patternProp === IS_NUMBER && typeof objProp === 'number') {
// return true;
// }
// return patternProp === objProp;
// }
// function isObjectContain(pattern, obj) {
// var prop;
// for (prop in pattern) {
// if (typeof obj[prop] === 'undefined' || !isEqualOrRegexMatch(pattern[prop], obj[prop])) {
// return false;
// }
// }
// return true;
// }
// function replaceSetResponse() {
// var communicator = objICHR_InteliwiseSaaSModule.core.communicator,
// funSetResponse = communicator.setResponse,
// v216, arrObjects, object, fnReturn, arrLength, i;
// communicator.setResponse = function (response) {
// v216 = ichr.json.JSON.encode(response),
// arrObjects = arr,
// arrLength = arrObjects.length;
// for (i = 0; i < arrLength; i++) {
// object = arrObjects[i];
// if (typeof object === 'undefined') {
// continue;
// } else if (typeof object.fn === 'function') {
// fnReturn = object.fn(v216, response);
// if (typeof fnReturn === 'string') {
// v216 = fnReturn;
// } else if (typeof fnReturn === 'object') {
// v216 = ichr.json.JSON.encode(fnReturn);
// }
// } else {
// v216 = v216.replace(object.ex, object.repl);
// }
// }
// response = ichr.json.JSON.decode(v216);
// funSetResponse.call(this, response);
// };
// };
// function addElement(object) {
// var length = arr.push(object);
// var key = length - 1;
// return key;
// };
// var api = {
// IS_NUMBER: IS_NUMBER,
// remove: function (key) {
// delete arr[key];
// },
// getNextKey: function () {
// return arr.length;
// },
// add: {
// fn: function (fn) {
// var elem = {
// 'fn': fn
// };
// return addElement(elem);
// },
// match: function (regexp, callback) {
// function matchFn(v216, response) {
// var match = v216.match(regexp);
// if (match) {
// callback(match, v216, response);
// }
// }
// return this.fn(matchFn);
// },
// matchOnce: function (regexp, callback) {
// var key = api.getNextKey();
// function matchFn(v216, response) {
// var match = v216.match(regexp);
// if (match) {
// callback(match, v216, response);
// api.remove(key);
// }
// }
// return this.fn(matchFn);
// },
// replace: function (ex, repl, args) {
// if (typeof ex === 'string') {
// if (typeof args === 'undefined') {
// args = 'g';
// }
// ex = new RegExp(ex, args);
// }
// return addElement({
// 'ex': ex,
// 'repl': repl
// });
// },
// commandHook: function (pattern, callback) {
// function commandLoopFn(v216, response) {
// var listName;
// var commands;
// var command;
// var i;
// if (!response || !response.commandSetList) {
// return;
// }
// for (listName in response.commandSetList) {
// if (!response.commandSetList.hasOwnProperty(listName)) {
// continue;
// }
// commands = response.commandSetList[listName];
// if (!commands.commandDescList) {
// continue;
// }
// for (i = commands.commandDescList.length - 1; i >= 0; i--) {
// if (!isObjectContain(pattern, commands.commandDescList[i])) {
// continue;
// }
// command = {
// command: commands.commandDescList[i],
// index: i,
// length: commands.commandDescList.length,
// add: function (addCommand, index) {
// index = index || 0;
// commands.commandDescList.splice(index, 0, addCommand);
// },
// addEnd: function (addCommand) {
// commands.commandDescList.push(addCommand);
// },
// getByIndex: function (index) {
// return commands.commandDescList[index];
// },
// remove: function () {
// commands.commandDescList.splice(i, 1);
// },
// };
// callback.apply(command, [v216, response]);
// }
// }
// return response;
// }
// return this.fn(commandLoopFn);
// },
// commandHookAll: function (pattern, callback) {
// function commandLoopFn(v216, response) {
// var listName;
// var commands;
// var command;
// var callbackCommands = [];
// var i;
// callbackCommands.removeAll = function () {
// for (var i = 0; i < this.length; i++) {
// this[i].remove();
// }
// }
// if (!response || !response.commandSetList) {
// return;
// }
// for (listName in response.commandSetList) {
// if (!response.commandSetList.hasOwnProperty(listName)) {
// continue;
// }
// commands = response.commandSetList[listName];
// if (!commands.commandDescList) {
// continue;
// }
// for (i = commands.commandDescList.length - 1; i >= 0; i--) {
// if (!isObjectContain(pattern, commands.commandDescList[i])) {
// continue;
// }
// command = {
// command: commands.commandDescList[i],
// index: i,
// length: commands.commandDescList.length,
// add: function (addCommand, index) {
// index = index || 0;
// commands.commandDescList.splice(index, 0, addCommand);
// },
// addEnd: function (addCommand) {
// commands.commandDescList.push(addCommand);
// },
// getByIndex: function (index) {
// return commands.commandDescList[index];
// },
// remove: function () {
// commands.commandDescList.splice(i, 1);
// },
// };
// callbackCommands.push(command);
// }
// if (callbackCommands.length > 0) {
// callback.apply(callbackCommands, [v216, response]);
// }
// }
// return response;
// }
// return this.fn(commandLoopFn);
// }
// }
// }
// return api;
// })();
// function IWVA_checkingLanguage() {
// iwsaas.buttonLC = objICHR_InteliwiseSaaSModule.core.factory.getObserverById('dc-live-support').getElement();
// IWVA_clearEventOnLCBtn();
// if (iwsaas.lang == "pl") { //lang is pl
// iwsaas.buttonLC.addEventListener('click', function () {
// IWVA_clearEventOnLCBtn();
// IWVA_openScript(16501); // #ShowWindowPolishOnRezer
// })
// IWVA_openScript(16971); // ConnectOperatorPL
// }
// if (iwsaas.lang == "en") {//lang is en
// iwsaas.buttonLC.addEventListener('click', function () {
// IWVA_clearEventOnLCBtn()
// IWVA_openScript(16595); // ShowWindowEnglishOnRezer
// })
// IWVA_openScript(16972); // ConnectOperatorEN 
// }
// }
// function IWVA_clearEventOnLCBtn() {
// iw.DOMEvents.removeEventListener(iwsaas.buttonLC, 'mouseClick', null);
// }
// function IWVA_connectLcScript(scriptID) {
// if (iwsaas.buttonLC == undefined) {
// iwsaas.buttonLC = objICHR_InteliwiseSaaSModule.core.factory.getObserverById('dc-live-support').getElement();
// }
// lcBtn = objICHR_InteliwiseSaaSModule.core.factory.getObserverById('dc-live-support');
// iw.DOMEvents.removeEventListener(lcBtn, 'mouseClick', null);
// iwsaas.buttonLC.addEventListener('click', function () {
// IWVA_openScript(scriptID);
// });
// }
// var labelForClientEmail = {
// "processorId": "proc-iwsaas-render",
// "type": "RenderTextField",
// "properties": {
// "prompt": "hidden",
// "value": "",
// }
// }
// ;
// IWVA_setResponse.add.commandHook(labelForClientEmail, function () {
// this.remove();
// });
// function IWVA_connectToLc() {
// if (dataLayer[0].language == "PL") {
// IWVA_connectLcScript(16971)
// } else if (dataLayer[0].language == "EN") {
// IWVA_connectLcScript(16972)
// }
// }
// var formToRenderLabel = {
// "processorId": "proc-iwsaas-render",
// "type": "RenderText",
// "properties": {
// "value": "<b>Monika:<\/b> <h2><b>skrypt-techniczny<\/b><\/h2>skrypt-techniczny-start",
// }
// }

// IWVA_setResponse.add.commandHook(formToRenderLabel, function () {
// if (iwsaas.notExisitsThat === undefined) {
// iwsaas.notExisitsThat = true;
// if (this.command.properties.dockerId === "dc-output") {
// IWVA_checkingLanguage();
// } else {
// IWVA_connectToLc();
// }
// }
// this.remove();
// });

// var formEmailRemove = {
// "processorId": "proc-iwsaas-render",
// "type": "RenderText",
//                 "properties": {
//                     "formId": /iwsaas-hist-item-form/g,
//                     "value": "<label>E-mail <\/label>"
//                 }
// }

// IWVA_setResponse.add.commandHook(formEmailRemove, function () {
// var inputCommand = this.getByIndex(this.index - 2);
// inputCommand.properties.cssClass = 'hideEmailForm';

// });

// IWVA_setResponse.add.commandHook(formToRenderLabel, function () {
//     if (iwsaas.notExisitsThat === undefined) {
//         iwsaas.notExisitsThat = true;
//         if (this.command.properties.dockerId === "dc-output") {
//             IWVA_checkingLanguage();
//         } else {
//             IWVA_connectToLc();
//         }
//     }
//     this.remove();
// });


// IWVA_setResponse.add.replace('<label>sysClientEmail </label>', '');