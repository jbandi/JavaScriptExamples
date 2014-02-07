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
/// <reference path="../../main/ts/contactRepository.ts" />
/// <reference path="../../main/ts/simpleContact.ts" />
/// <reference path="../../main/ts/simpleContactRepository.ts" />

describe('Contact Repository', () => {
    var contactRepository:cdemo.ContactRepository;

    beforeEach(function () {
        contactRepository = new cdemo.SimpleContactRepository();
    });

    it('should be initialized with empty contact list', () => {
        expect(contactRepository.getContacts().length).toBe(0);
    });

    it('should return an added contact in the contacts list', () => {
        var contact:cdemo.Contact = new cdemo.SimpleContact('Kai', 'Toedter', 'kai@toedter.com');
        contactRepository.addContact(contact);
        expect(contactRepository.getContacts()).toContain(contact);
    });

    it('should be empty after all contacts have been removed', () => {
        var contact:cdemo.Contact = new cdemo.SimpleContact('Kai', 'Toedter', 'kai@toedter.com');
        contactRepository.addContact(contact);
        contactRepository.clear();
        expect(contactRepository.getContacts().length).toBe(0);
    });
});
