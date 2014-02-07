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

/// <reference path="contact.ts" />

module cdemo {
    export enum EventType { SUBSCRIBE, UNSUBSCRIBE, CREATE_CONTACT, UPDATE_CONTACT, DELETE_CONTACT, UNKNOWN }

    export class Event {

        constructor(private type:EventType, private sourceId:string, private contact:cdemo.Contact) {
        }

        getType():EventType {
            return this.type;
        }

        getSourceId():string {
            return this.sourceId;
        }

        getData():cdemo.Contact {
            return this.contact;
        }

        static fromJson(json:string) {
            var jsonObject = JSON.parse(json);
            var type:EventType = EventType[String(jsonObject.type)];
            if (!type) {
                type = EventType.UNKNOWN;
            }

            return new Event(type, jsonObject.sourceId, jsonObject.data);
        }
    }
}
