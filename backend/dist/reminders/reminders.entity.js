"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemindersEntity = void 0;
const base_1 = require("../utils/base");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
let RemindersEntity = class RemindersEntity extends base_1.Base {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, author => author.events),
    (0, typeorm_1.JoinColumn)({ name: 'author_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], RemindersEntity.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RemindersEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: Date.now(), type: 'bigint' }),
    __metadata("design:type", Number)
], RemindersEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'no-repeat' }),
    __metadata("design:type", String)
], RemindersEntity.prototype, "repeat", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], RemindersEntity.prototype, "completed", void 0);
RemindersEntity = __decorate([
    (0, typeorm_1.Entity)('reminders')
], RemindersEntity);
exports.RemindersEntity = RemindersEntity;
//# sourceMappingURL=reminders.entity.js.map