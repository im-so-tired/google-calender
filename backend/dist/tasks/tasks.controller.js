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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const user_decorator_1 = require("../user/user.decorator");
const tasks_dto_1 = require("./tasks.dto");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
let TasksController = class TasksController {
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    async create(userId, dto) {
        return await this.tasksService.create(userId, dto);
    }
    async byId(id) {
        return await this.tasksService.byId(+id);
    }
    async update(id, dto) {
        return await this.tasksService.update(+id, dto);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    auth_decorator_1.Auth,
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, tasks_dto_1.TasksDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(200),
    auth_decorator_1.Auth,
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "byId", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    auth_decorator_1.Auth,
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, tasks_dto_1.TasksDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "update", null);
TasksController = __decorate([
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
exports.TasksController = TasksController;
//# sourceMappingURL=tasks.controller.js.map