/*
 TypeScript Contacts Demo

 Copyright 2013 Kai Toedter

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/// <reference path="../../typescript-defs/jasmine.d.ts" />
/// <reference path="../../main/ts/contact.ts" />
/// <reference path="../../main/ts/simpleContact.ts" />
/// <reference path="../../main/ts/event.ts" />
/// <reference path="../../main/ts/eventBus.ts" />

describe("EventBus", () => {
    var eventBus:cdemo.EventBus<cdemo.Event>;

    beforeEach(() => {
        eventBus = new cdemo.EventBus();
    });

    it("should be initialized", () => {
        expect(eventBus).toBeDefined();
    });

    it("should invoke subscriber after publish", () => {
        var invoked:boolean = false;
        eventBus.subscribe(function (event:cdemo.Event) {
            invoked = true;
        });
        var contact:cdemo.Contact = new cdemo.SimpleContact('Kai', 'Toedter', 'kai@toedter.com');
        eventBus.publish(new cdemo.Event(cdemo.EventType.SUBSCRIBE, 'Id-1', contact));
        expect(invoked).toBe(true);
    });
});