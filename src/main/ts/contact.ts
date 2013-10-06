/*
 TypeScript Contacts Demo

 Copyright [yyyy] [name of copyright owner]

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

module cdemo {
    export interface Contact {
        getFirstName():string;
        getLastName(): string;
        getEMail(): string;
    }

    export class SimpleContact implements Contact {
        constructor(private firstName:string, private lastName:string, private email:string) {
        }

        getFirstName():string {
            return this.firstName;
        }

        getLastName():string {
            return this.lastName;
        }

        getEMail():string {
            return this.email;
        }
    }
}