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
exports.EventsEntity = void 0;
const user_entity_1 = require("../user/user.entity");
const typeorm_1 = require("typeorm");
const moment = require("moment");
const base_1 = require("../utils/base");
let EventsEntity = class EventsEntity extends base_1.Base {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, author => author.events),
    (0, typeorm_1.JoinColumn)({ name: 'author_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], EventsEntity.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EventsEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: moment().unix(), name: 'start_time', type: 'bigint' }),
    __metadata("design:type", Number)
], EventsEntity.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: moment().add(1, 'h').unix(),
        name: 'end_time',
        type: 'bigint',
    }),
    __metadata("design:type", Number)
], EventsEntity.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Array)
], EventsEntity.prototype, "guests", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], EventsEntity.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', type: 'text' }),
    __metadata("design:type", String)
], EventsEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], EventsEntity.prototype, "reminder", void 0);
EventsEntity = __decorate([
    (0, typeorm_1.Entity)('events')
], EventsEntity);
exports.EventsEntity = EventsEntity;
//# sourceMappingURL=events.entity.js.map