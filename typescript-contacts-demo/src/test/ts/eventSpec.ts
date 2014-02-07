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

describe('Event', () => {
    it('should be initialized', () => {
        var contact:cdemo.Contact = new cdemo.SimpleContact('Kai', 'Toedter', 'kai@toedter.com');
        var event:cdemo.Event = new cdemo.Event(cdemo.EventType.SUBSCRIBE, 'id-1', contact);
        expect(event.getSourceId()).toBe('id-1');
        expect(event.getType()).toBe(cdemo.EventType.SUBSCRIBE);
    });

    it('should be created from valid json', () => {
        var json = {"type":"UNSUBSCRIBE","sourceId":"id-2","contact":{"firstName":"Kai","lastName":"Toedter","email":"kai@toedter.com"}};
        var event:cdemo.Event = cdemo.Event.fromJson(JSON.stringify(json));
        expect(event.getSourceId()).toBe('id-2');
        expect(event.getType()).toBe(cdemo.EventType.UNSUBSCRIBE);
    });

    it('should create UNKNOWN event type from valid json event type', () => {
        var json = {"type":"xxx","sourceId":"id-2","contact":{"firstName":"Kai","lastName":"Toedter","email":"kai@toedter.com"}};
        var event:cdemo.Event = cdemo.Event.fromJson(JSON.stringify(json));
        expect(event.getSourceId()).toBe('id-2');
        expect(event.getType()).toBe(cdemo.EventType.UNKNOWN);
    });
});
