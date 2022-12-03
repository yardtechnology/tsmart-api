"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = __importDefault(require("nodemailer"));
var MailController = /** @class */ (function () {
    function MailController() {
        this.transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_SERVICE_PASSWORD,
            },
        });
    }
    // public transporter = nodemailer.createTransport({
    //   host: "smtp.zeptomail.com",
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     user: process.env.EMAIL,
    //     pass: process.env.EMAIL_SERVICE_PASSWORD,
    //   },
    // });
    // send mail with subject and text
    MailController.prototype.sendMail = function (_a) {
        var to = _a.to, subject = _a.subject, text = _a.text;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_b) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        try {
                            var mailOptions = {
                                from: process.env.EMAIL,
                                to: to,
                                subject: subject,
                                text: text,
                            };
                            _this.transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                            });
                        }
                        catch (error) {
                            reject(error);
                        }
                    })];
            });
        });
    };
    // send mail with subject and html content
    MailController.prototype.sendHtmlMail = function (_a) {
        var to = _a.to, subject = _a.subject, html = _a.html, templet = _a.templet;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_b) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        try {
                            if (!to) {
                                console.log("recipient is not provided");
                                resolve();
                            }
                            var htmlTemplet = void 0;
                            switch (templet) {
                                case "normal":
                                    htmlTemplet = "<!DOCTYPE html>\n            <html lang=\"en\">\n            \n            <head>\n                <meta charset=\"UTF-8\">\n                <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n                <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n                <title>tSmart</title>\n                <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n                <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n                <link href=\"https://fonts.googleapis.com/css2?family=Lato&family=Sacramento&display=swap\" rel=\"stylesheet\">\n                <style>\n                    * {\n                      padding: 0%;\n                      margin: 0%;\n                      box-sizing: border-box;\n                      font-family: Arial, Helvetica, sans-serif;\n                      text-decoration: none;\n                      border: none !important;\n                    }\n                    \n                    .container {\n                      width: 100%;\n                      /* height: 100vh; */\n                      padding: 0.5rem;\n                    }\n\n                    .table_one {\n                      height: 100%;\n                      width: 100%;\n                      background-color: white;\n                      padding-top: 1rem;\n                      padding-bottom: 1rem;\n                    }\n        \n                    table {\n                      border-collapse: collapse;\n                    }\n                    \n                    .img_one {\n                      width: 15rem;\n                      margin-left: 2rem;\n                    }\n                    \n                    #td_2 {\n                      float: right;\n                      margin-right: 2rem;\n                      background-color: #22b7cb;\n                      color: white;\n                      padding: 10px;\n                    }\n                    \n                    #td_3 {\n                      background: #000;\n                      width: 100%;\n                      height: 1px;\n                    }\n                    \n                    #td_3 p {\n                      font-size: 1px;\n                    }\n                    \n                    .td_5 {\n                      float: left;\n                      padding-left: 2rem;\n                      padding-top: 1rem;\n                      padding-bottom: 0.5rem;\n                    }\n                    \n                    .td_4 {\n                      padding-left: 2rem;\n                      padding-top: 1rem;\n                      padding-bottom: 0.5rem;\n                    }\n                    \n                    #td_6 {\n                      padding-left: 2rem;\n                      padding-bottom: 0.5rem;\n                      color: #22b7cb;\n                    }\n                    \n                    #td_7 {\n                      float: left;\n                      padding-left: 2rem;\n                      padding-bottom: 0.5rem;\n                      color: #22b7cb;\n                    }\n                    \n                    #td_8 {\n                      padding-left: 2rem;\n                      padding-bottom: 0.5rem;\n                    }\n                    \n                    #td_9 {\n                      float: left;\n                      padding-left: 2rem;\n                      padding-bottom: 0.5rem;\n                    }\n                    \n                    #td_10 {\n                      padding-left: 2rem;\n                      padding-bottom: 0.5rem;\n                    }\n                    \n                    #td_11 {\n                      float: left;\n                      padding-left: 2rem;\n                      padding-bottom: 0.5rem;\n                    }\n                    \n                    #td_12 {\n                      padding-left: 2rem;\n                      padding-bottom: 0.5rem;\n                    }\n                    \n                    #td_13 {\n                      float: left;\n                      padding-left: 2rem;\n                      padding-bottom: 0.5rem;\n                    }\n                    \n                    #td_17 {\n                      padding-left: 2rem;\n                      padding-bottom: 0.5rem;\n                      padding-top: 0.5rem;\n                    }\n                    \n                    #td_19 {\n                      padding-left: 2rem;\n                      padding-bottom: 0.5rem;\n                    }\n                    \n                    #td_18 {\n                      float: left;\n                      padding-left: 2rem;\n                      padding-bottom: 0.5rem;\n                      padding-top: 0.5rem;\n                    }\n                    \n                    #td_14 {\n                      padding-left: 2rem;\n                      padding-bottom: 1rem;\n                      padding-top: 1rem;\n                    }\n                    \n                    #td_15 {\n                      float: left;\n                      padding-left: 2rem;\n                      padding-bottom: 1rem;\n                      padding-top: 1rem;\n                    }\n                    \n                    #td_16 {\n                      background-color: black;\n                      width: 100%;\n                      width: 1px;\n                      font-size: 1px;\n                    }\n                    \n                    .table_two {\n                      height: 100%;\n                      width: 100%;\n                      background-color: white;\n                      padding-top: 1rem;\n                      padding-bottom: 1rem;\n                    }\n                    \n                    .description {\n                      width: 40%;\n                    }\n                    \n                    #td-1 {\n                      padding-left: 2rem;\n                      padding-top: 0.5rem;\n                      padding-bottom: 0.5rem;\n                      background: #22b7cb;\n                      color: white;\n                      text-align: start;\n                    }\n                    \n                    #td-2 {\n                      padding-left: 2rem;\n                      padding-top: 0.5rem;\n                      padding-bottom: 0.5rem;\n                      background: #22b7cb;\n                      color: white;\n                      text-align: start;\n                    }\n                    \n                    #td-3 {\n                      padding-left: 2rem;\n                      padding-top: 0.5rem;\n                      padding-bottom: 0.5rem;\n                      background: #22b7cb;\n                      color: white;\n                      text-align: start;\n                    }\n                    \n                    #td-4 {\n                      padding-left: 2rem;\n                      padding-top: 0.5rem;\n                      padding-bottom: 0.5rem;\n                      background: #22b7cb;\n                      color: white;\n                      text-align: start;\n                    }\n                    \n                    #td-5 {\n                      padding-left: 2rem;\n                      padding-top: 0.5rem;\n                      padding-bottom: 0.5rem;\n                      background: #22b7cb;\n                      color: white;\n                      text-align: start;\n                    }\n                    .img_two {\n                      height: 2.5rem;\n                      width: 2.5rem;\n                    }\n                    \n                    #td-6 {\n                      padding-left: 2rem;\n                      padding-top: 0.5rem;\n                      padding-bottom: 0.5rem;\n                    }\n                    \n                    #td-7 {\n                      padding-left: 2rem;\n                      padding-top: 0.5rem;\n                      padding-bottom: 0.5rem;\n                    }\n                    \n                    #td-8 {\n                      padding-left: 2rem;\n                      padding-top: 0.5rem;\n                      padding-bottom: 0.5rem;\n                    }\n                    \n                    #td-9 {\n                      padding-left: 2rem;\n                      padding-top: 0.5rem;\n                      padding-bottom: 0.5rem;\n                    }\n                    \n                    #td-10 {\n                      padding-left: 2rem;\n                      padding-top: 0.5rem;\n                      padding-bottom: 0.5rem;\n                    }\n                    \n                    #td-11 {\n                      padding-left: 2rem;\n                      padding-top: 0.5rem;\n                      padding-bottom: 0.5rem;\n                    }\n                    \n                    #td-12 {\n                      padding-left: 2rem;\n                      padding-top: 0.5rem;\n                      padding-bottom: 0.5rem;\n                    }\n                    \n                    #td-13 {\n                      padding-left: 2rem;\n                      padding-top: 0.5rem;\n                      padding-bottom: 0.5rem;\n                    }\n                    \n                    #td-14 {\n                      padding-left: 2rem;\n                      padding-top: 0.5rem;\n                      padding-bottom: 0.5rem;\n                    }\n                    \n                    #td-15 {\n                      padding-left: 2rem;\n                      padding-top: 0.5rem;\n                      padding-bottom: 0.5rem;\n                    }\n                    .border {\n                      background: #000;\n                      width: 100%;\n                      height: 1px;\n                      font-size: 1px;\n                    }\n                    .heading {\n                      background: #22b7cb;\n                    }\n                    .table_head {\n                      padding-left: 2rem;\n                      text-align: start;\n                    }\n                    .table_three {\n                      width: 100%;\n                    }\n                    .headId {\n                      width: 70%;\n                    }\n                    .table_body {\n                      padding-left: 2rem;\n                      padding-top: 0.5rem;\n                    }\n                    .table_span {\n                      padding: 5px;\n                      border: 1px solid black;\n                    }\n                    #sign {\n                      text-align: end;\n                      padding-top: 7rem;\n                      padding-bottom: 1rem;\n                      padding-right: 2rem;\n                    }\n                    .button-warper{\n                      white-space: nowrap;\n                      padding-top: 0.5rem 1rem;\n                    } \n                    \n                </style>\n            </head>\n            \n            <body>\n                <div\n                    style=\"width: 100%;max-width:720px;margin:auto; background-color: rgb(238,238,238);\">\n                    <table style=\"width: 100%; \">\n                    <tr\n                    style=\"\n                      width: 100%;\n                      text-align: center;\n                      background-color: #ffebf5;\n                    \"\n                  >\n                    <td style=\"width: 100%; padding: 1rem;text-align:start\">\n                      <!-- <div style=\"text-align: start\"> -->\n                      <img\n                        src=\"".concat(process.env.WHITE_LOGO_URL, "\"\n                        alt=\"").concat(process.env.APP_NAME, "\"\n                        style=\"width: 100%; max-width: 180px\"\n                      />\n          \n                      <!-- </div> -->\n                    </td>\n                    <td\n                      style=\"\n                        background-color: transparent;\n                        border-color: transparent;\n                        padding: 1rem;\n                      \"\n                    >\n                      <div class=\"button-warper\">\n                        <a\n                          href=\"").concat(process.env.WEBSITE_END_POINT, "/signin\"\n                          style=\"\n                            padding: 0.7rem 3rem;\n                            background-color: #400524;\n                            border-radius: 0.5rem;\n                            border: 1px solid white;\n                            float: right;\n                            font-weight: 900;\n                            margin-top: 1rem;\n                            color: white;\n                          \"\n                        >\n                          Login\n                        </a>\n                      </div>\n                    </td>\n                  </tr>\n                        <tr style=\"width: 100%; height: 18rem\">\n                  <td colspan=\"2\" style=\"padding: 1rem\">\n                    ").concat(html, "\n                  </td>\n                </tr>\n                        <tr style=\"width:100%;\">\n                            <td colspan=\"2\"\n                                style=\"text-align:center ; padding: 1rem; background-color: rgb(228,228,237); color: rgb(113, 113, 113);\">\n                                <div>\n                                    <a href=\"\" style=\"text-decoration: none; margin: .2rem; \">\n            \n                                        <img src=\"").concat(process.env.TWITTER2_URL, "\" alt=\"\" style=\" height: 2.5em; width: 2.6em;\">\n            \n                                    </a>\n                                    <a href=\"\" style=\"text-decoration: none; margin: .2rem;   \">\n            \n                                        <img src=\"").concat(process.env.LINKEDIN2_URL, "\" alt=\"\" style=\"height: 2.5em; width: 2.5em;\">\n            \n                                    </a>\n                                    <a href=\"\" style=\"text-decoration: none; margin: .2rem \">\n            \n                                        <img src=\"").concat(process.env.WIFI2_URL, "\" alt=\"\" style=\" height: 2.5em; width: 2.5em;\">\n            \n                                    </a>\n                                    <a href=\"\" style=\"text-decoration: none; margin: .2rem; \">\n            \n                                        <img src=\"").concat(process.env.INSTAGRAM2_URL, "\" alt=\"\" style=\" height: 2.5em; width: 2.5em;\">\n            \n                                    </a>\n                                </div>\n                                <h3 style=\"text-align: center; padding: 1rem;\">+91 9438530447</h3>\n                                <p>Copyright \u00A9 2022 ").concat(process.env.APP_NAME, "</p>\n                            </td>\n                        </tr>\n            \n            \n                    </table>\n                    <div style=\"width: 100%; text-align: center; padding: 2rem;\">\n                        <p style=\"color: rgb(113, 113, 113) ;\">").concat(process.env.APP_NAME, "</p>\n                        <p style=\"color: rgb(113, 113, 113) ;\">").concat(process.env.ADDRESS, "</p>\n                    </div>\n                    <div style=\"width: 100%; text-align: center; padding: 2rem;\">\n                        <p style=\"color: rgb(113, 113, 113) ; font-size: 12px;\">You're receiving this email because you\n                            signed up for a ").concat(process.env.APP_NAME, "\n                            account.</p>\n                    </div>\n                </div>\n            </body>\n            \n            </html>");
                                    break;
                                default:
                                    htmlTemplet = html;
                                    break;
                            }
                            var mailOptions = {
                                from: process.env.EMAIL,
                                to: to,
                                subject: subject,
                                html: htmlTemplet,
                            };
                            _this.transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                            });
                        }
                        catch (error) {
                            reject(error);
                        }
                    })];
            });
        });
    };
    return MailController;
}());
exports.default = MailController;
