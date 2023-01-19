import _ from "lodash";
import { loginToken } from "@helpers/auth/tokenGenerator";
import { createHash } from "@helpers/crypto/hmac-sha-256";
import { errorRes } from "@middlewares/error";
import userService from "@repository/user";
import { userProjection } from "@projection";
import BaseController from "../base";

import { Controller, Param, Body, Get, Post, Put, Delete, QueryParams } from "routing-controllers";

@Controller("/user")
export default class UserAuthController extends BaseController {
  service;
  constructor() {
    super(userService);
    this.service = userService;
  }

  @Post("/login")
  async login(@Body() body: any) {
    const { email, password } = body;

    // Get hash of email. Since email is not stored in plain text
    const emailHash = createHash(email);

    // Get User info
    const filters = { emailHash };
    const projection = userProjection(["basic", "minimal", "internal"]);
    const userDbData = await this.service.getOne(filters, projection);
    if (!userDbData || !userDbData.validatePassword(password)) {
      throw errorRes.login();
    }

    // Generate login Token
    let data: object = { _id: userDbData._id, userType: userDbData.userType };
    const token: string = loginToken(data);
    data = { ...data, name: userDbData.name, email: userDbData.email, token };

    return data;
  }

  @Get("/rotateToken")
  async rotateToken(@QueryParams() query: any) {
    return { message: "Yes" };
  }
}
