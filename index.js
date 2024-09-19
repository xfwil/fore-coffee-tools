import "dotenv/config";
import chalk from "chalk";
import { input, select } from "@inquirer/prompts";
import fetch from "node-fetch";
import { v4 } from "uuid";
import fs from "fs";
import { table } from "table";
import dayjs from "dayjs";

const API_KEY = process.env.API_KEY_SMSHUB;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getBalanceTokoclaude = async () => {
  const send = await fetch(
    "https://tokoclaude.com/api/get-profile/" + API_KEY,
    {
      method: "GET",
    }
  );
  const response = await send.json();
  return response;
};

const getBalanceTurbootp = async () => {
  const send = await fetch("https://turbootp.com/api/get-profile/" + API_KEY, {
    method: "GET",
  });
  const response = await send.json();
  return response;
};

const getBalance = async () => {
  const send = await fetch(
    "https://smshub.org/stubs/handler_api.php?api_key=" +
      API_KEY +
      "&action=getBalance",
    {
      method: "GET",
    }
  );
  const response = await send.text();
  return response;
};

const getNumberTokoclaude = async () => {
  const send = await fetch(
    "https://tokoclaude.com/api/set-orders/" + API_KEY + "/346",
    {
      method: "GET",
    }
  );
  const response = await send.json();
  return response;
};

const getNumberTurbootp = async () => {
  const send = await fetch(
    "https://turbootp.com/api/set-orders/" + API_KEY + "/346",
    {
      method: "GET",
    }
  );
  const response = await send.json();
  return response;
};

const getNumber = async () => {
  const send = await fetch(
    "https://smshub.org/stubs/handler_api.php?api_key=" +
      API_KEY +
      "&action=getNumber&service=asy&operator=telkomsel&country=6",
    {
      method: "GET",
    }
  );
  const response = await send.text();
  return response;
};

const getCodeTokoclaude = async (id) => {
  const send = await fetch(
    "https://tokoclaude.com/api/get-orders/" + API_KEY + "/" + id,
    {
      method: "GET",
    }
  );
  const response = await send.json();
  return response;
};

const getCodeTurbootp = async (id) => {
  const send = await fetch(
    "https://turbootp.com/api/get-orders/" + API_KEY + "/" + id,
    {
      method: "GET",
    }
  );
  const response = await send.json();
  return response;
};

const getCode = async (id) => {
  const send = await fetch(
    "https://smshub.org/stubs/handler_api.php?api_key=" +
      API_KEY +
      "&action=getStatus&id=" +
      id,
    {
      method: "GET",
    }
  );
  const response = await send.text();
  return response;
};

const setStatusTokoclaude = async (id, status) => {
  let endpoint = "https://tokoclaude.com/api/";
  if (status === "6") {
    endpoint += "finish-orders/" + API_KEY + "/" + id;
  } else if (status === "8") {
    endpoint += "cancle-orders/" + API_KEY + "/" + id;
  } else {
    endpoint += "resend-order/" + API_KEY + "/" + id;
  }

  const send = await fetch(endpoint, {
    method: "GET",
  });
  const response = await send.json();
  return response;
};

const setStatusTurbootp = async (id, status) => {
  let endpoint = "https://turbootp.com/api/";
  if (status === "6") {
    endpoint += "finish-orders/" + API_KEY + "/" + id;
  } else if (status === "8") {
    endpoint += "cancle-orders/" + API_KEY + "/" + id;
  } else {
    endpoint += "resend-order/" + API_KEY + "/" + id;
  }

  const send = await fetch(endpoint, {
    method: "GET",
  });
  const response = await send.json();
  return response;
};

const setStatus = async (id, status) => {
  const send = await fetch(
    "https://smshub.org/stubs/handler_api.php?api_key=" +
      API_KEY +
      "&action=setStatus&id=" +
      id +
      "&status=" +
      status,
    {
      method: "GET",
    }
  );
  const response = await send.text();
  return response;
};

const getToken = async (deviceId) => {
  const send = await fetch("https://api.fore.coffee/auth/get-token", {
    headers: {
      Host: "api.fore.coffee",
      "Appsflyer-Id": "1712110677185-8189413",
      "Content-Type": "application/json",
      Accept: "*/*",
      "Appsflyer-Advertising-Id": "95B89FED-69A8-4D99-9751-48B54339738E",
      "App-Version": process.env.FORE_VERSION,
      "Device-Id": deviceId,
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "id-ID;q=1.0, en-ID;q=0.9",
      Platform: "android",
      "If-None-Match": 'W/"d6-nXAYxfa/enhSCHRgcHtzJJDI7Nk"',
      "User-Agent": "okhttp/4.11.0",
      "Os-Version": "13",
      "Secret-Key": "0kFe6Oc3R1eEa2CpO2FeFdzElp",
    },
  });
  const response = await send.json();
  return response;
};

const changeData = async (
  deviceId,
  accessToken,
  name = null,
  email = null,
  birthday = null
) => {
  let postdata = {};
  if (name) {
    postdata.user_name = name;
  }
  if (email) {
    postdata.user_email = email;
  }
  if (birthday) {
    postdata.user_birthday = birthday;
  }
  const send = await fetch("https://api.fore.coffee/user/profile", {
    method: "PUT",
    headers: {
      Host: "api.fore.coffee",
      "Appsflyer-Id": "1712110677185-8189413",
      "Content-Type": "application/json",
      "Country-Id": "1",
      Accept: "*/*",
      "Appsflyer-Advertising-Id": "95B89FED-69A8-4D99-9751-48B54339738E",
      "App-Version": "4.1.24",
      "Device-Id": deviceId,
      "Accept-Language": "id-ID;q=1.0, en-ID;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      Platform: "android",
      Language: "ID",
      "Access-Token": accessToken,
      Timezone: "+07:00",
      "User-Agent":
        "Fore Coffee/4.1.24 (coffee.fore.fore; build:1128; iOS 13) Alamofire/4.9.1",
      "Os-Version": "13",
    },
    body: JSON.stringify(postdata),
  });
  const response = await send.json();
  return response;
};

const addPin = async (deviceId, accessToken, pin) => {
  const send = await fetch("https://api.fore.coffee/auth/pin", {
    method: "POST",
    headers: {
      Host: "api.fore.coffee",
      "Appsflyer-Id": "1712110677185-8189413",
      "Content-Type": "application/json",
      "Country-Id": "1",
      Accept: "*/*",
      "Appsflyer-Advertising-Id": "95B89FED-69A8-4D99-9751-48B54339738E",
      "App-Version": process.env.FORE_VERSION,
      "Device-Id": deviceId,
      "Accept-Language": "id-ID;q=1.0, en-ID;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      Platform: "android",
      Language: "ID",
      "Access-Token": accessToken,
      Timezone: "+07:00",
      "User-Agent": "okhttp/4.11.0",
      "Os-Version": "13",
    },
    body: JSON.stringify({
      confirm_pin: pin,
      pin: pin,
    }),
  });
  const response = await send.json();
  return response;
};

const checkPhone = async (deviceId, accessToken, phoneNumber) => {
  const send = await fetch("https://api.fore.coffee/auth/check-phone", {
    method: "POST",
    headers: {
      Host: "api.fore.coffee",
      "Appsflyer-Id": "1712110677185-8189413",
      "Content-Type": "application/json",
      "Country-Id": "1",
      Accept: "*/*",
      "Appsflyer-Advertising-Id": "95B89FED-69A8-4D99-9751-48B54339738E",
      "App-Version": process.env.FORE_VERSION,
      "Device-Id": deviceId,
      "Accept-Language": "id-ID;q=1.0, en-ID;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      Platform: "android",
      Language: "ID",
      "Access-Token": accessToken,
      Timezone: "+07:00",
      "User-Agent": "okhttp/4.11.0",
      "Os-Version": "13",
    },
    body: JSON.stringify({ phone: "+" + phoneNumber }),
  });
  const response = await send.json();
  return response;
};

const reqLogin = async (deviceId, accessToken, phoneNumber) => {
  const send = await fetch("https://api.fore.coffee/auth/req-login-code", {
    method: "POST",
    headers: {
      Host: "api.fore.coffee",
      "Appsflyer-Id": "1712110677185-8189413",
      "Content-Type": "application/json",
      "Country-Id": "1",
      Accept: "*/*",
      "Appsflyer-Advertising-Id": "95B89FED-69A8-4D99-9751-48B54339738E",
      "App-Version": process.env.FORE_VERSION,
      "Device-Id": deviceId,
      "Accept-Language": "id-ID;q=1.0, en-ID;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      Platform: "android",
      Language: "ID",
      "Access-Token": accessToken,
      Timezone: "+07:00",
      "User-Agent": "okhttp/4.11.0",
      "Os-Version": "13",
    },
    body: JSON.stringify({
      method: "",
      phone: "+" + phoneNumber,
    }),
  });
  const response = await send.json();
  return response;
};

const signUp = async (
  deviceId,
  accessToken,
  phoneNumber,
  name,
  otp,
  refferalCode
) => {
  const send = await fetch("https://api.fore.coffee/auth/sign-up", {
    method: "POST",
    headers: {
      Host: "api.fore.coffee",
      "Appsflyer-Id": "1712110677185-8189413",
      "Content-Type": "application/json",
      "Country-Id": "1",
      Accept: "*/*",
      "Appsflyer-Advertising-Id": "95B89FED-69A8-4D99-9751-48B54339738E",
      "App-Version": process.env.FORE_VERSION,
      "Device-Id": deviceId,
      "Accept-Language": "id-ID;q=1.0, en-ID;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      Platform: "android",
      Language: "ID",
      "Access-Token": accessToken,
      Timezone: "+07:00",
      "User-Agent": "okhttp/4.11.0",
      "Os-Version": "13",
    },
    body: JSON.stringify({
      whatsapp: 0,
      phone: "+" + phoneNumber,
      name: name,
      code: otp,
      referral_code: refferalCode,
    }),
  });
  const response = await send.json();
  return response;
};

const signInWithPIN = async (deviceId, accessToken, phoneNumber, pin) => {
  const send = await fetch("https://api.fore.coffee/auth/login/pin", {
    method: "POST",
    headers: {
      Host: "api.fore.coffee",
      "Appsflyer-Id": "1712110677185-8189413",
      "Content-Type": "application/json",
      "Country-Id": "1",
      Accept: "*/*",
      "Appsflyer-Advertising-Id": "95B89FED-69A8-4D99-9751-48B54339738E",
      "App-Version": process.env.FORE_VERSION,
      "Device-Id": deviceId,
      "Accept-Language": "id-ID;q=1.0, en-ID;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      Platform: "android",
      Language: "ID",
      "Access-Token": accessToken,
      Timezone: "+07:00",
      "User-Agent": "okhttp/4.11.0",
      "Os-Version": "13",
    },
    body: JSON.stringify({
      phone: "+" + phoneNumber,
      pin: pin,
      country_id: 1,
    }),
  });
  const response = await send.json();
  return response;
};

const profileInfo = async (deviceId, accessToken) => {
  const send = await fetch(
    "https://api.fore.coffee/user/profile/detail?last_seen=2020-11-12%2000%3A00%3A00",
    {
      headers: {
        Host: "api.fore.coffee",
        "Appsflyer-Id": "1712110677185-8189413",
        "Content-Type": "application/json",
        "Country-Id": "1",
        Accept: "*/*",
        "Appsflyer-Advertising-Id": "95B89FED-69A8-4D99-9751-48B54339738E",
        "App-Version": process.env.FORE_VERSION,
        "Device-Id": deviceId,
        "Accept-Language": "id-ID;q=1.0, en-ID;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        Platform: "android",
        Language: "ID",
        "Access-Token": accessToken,
        Timezone: "+07:00",
        "User-Agent": "okhttp/4.11.0",
        "Os-Version": "13",
      },
    }
  );
  const response = await send.json();
  return response;
};

const checkVouchers = async (deviceId, accessToken) => {
  const send = await fetch(
    "https://api.fore.coffee/user/voucher?page=1&perpage=20&disc_type=cat_promo&vc_disc_type=order",
    {
      headers: {
        Host: "api.fore.coffee",
        "Appsflyer-Id": "1712110677185-8189413",
        "Content-Type": "application/json",
        "Country-Id": "1",
        Accept: "*/*",
        "Appsflyer-Advertising-Id": "95B89FED-69A8-4D99-9751-48B54339738E",
        "App-Version": process.env.FORE_VERSION,
        "Device-Id": deviceId,
        "Accept-Language": "id-ID;q=1.0, en-ID;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        Platform: "android",
        Language: "ID",
        "Access-Token": accessToken,
        Timezone: "+07:00",
        "User-Agent": "okhttp/4.11.0",
        "Os-Version": "13",
      },
    }
  );
  const response = await send.json();
  return response;
};

const randomUser = async () => {
  const send = await fetch("https://randomuser.me/api?nat=us", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await send.json();
  return response;
};

(async function () {
  console.log(`Fore Coffee`);
  console.log(`Author: ${chalk.green("@x0xdead")}`);
  console.log();
  console.log("1. List Accounts");
  console.log("2. Add Manually Accounts ( PIN Required )");
  console.log("3. Create Account Manual OTP");
  console.log("4. Create Account + SMSHub");
  console.log("5. Create Account + Tokoclaude");
  console.log("6. Create Account + TurboOTP");
  console.log("7. Check Voucher");
  console.log();

  const choice = await input({
    type: "number",
    name: "choice",
    message: "Select an option",
    validate: (value) => {
      if (isNaN(value) || value < 1 || value > 7) {
        return "Please enter a valid number between 1 and 7";
      }
      return true;
    },
  });

  if (choice) {
    if (choice === "1") {
      console.clear();
      console.log("List Accounts");
      console.log();

      const columns = [
        "Nomor Telepon",
        "PIN",
        "Nama",
        "Tanggal Lahir",
        "Email",
        "Status",
        "Point",
      ];

      if (!fs.existsSync("accounts.json")) {
        await fs.writeFileSync("accounts.json", "[]");
        console.log(
          "accounts.json not found, you need add manually accounts or create account"
        );
        return;
      }

      const accounts = fs.readFileSync("accounts.json", "utf8");
      const accountsJson = JSON.parse(accounts);

      if (accountsJson.length === 0) {
        console.log("No accounts found");
        return;
      }

      const data = accountsJson.map((account) => [
        account.phone,
        account.pin,
        account.name,
        account.birthday,
        account.email,
        account.status,
        account.point,
      ]);

      const tableData = [columns, ...data];
      const output = table(tableData);
      console.log(output);
    } else if (choice === "2") {
      console.clear();
      console.log("Add Manually Accounts");
      console.log();

      // Phone Number and PIN
      const phoneNumber = await input({
        type: "text",
        name: "phoneNumber",
        message: "Enter Phone Number",
      });
      const pin = await input({
        type: "text",
        name: "pin",
        message: "Enter PIN",
        default: process.env.DEFAULT_PIN,
      });

      if (!phoneNumber || !pin) {
        console.log("Please enter a valid phone number and pin");
        return;
      }

      console.log();
      console.log(`[+] Logging in with phone number ${phoneNumber}`);

      const uuid = v4();
      const token = await getToken(uuid);
      if (token && token.payload) {
        const access_token = token.payload.access_token;
        const refresh_token = token.payload.refresh_token;

        const doCheckPhone = await checkPhone(
          uuid,
          token.payload.access_token,
          phoneNumber
        );
        if (
          doCheckPhone &&
          doCheckPhone.payload &&
          doCheckPhone.payload.is_registered === 1 &&
          doCheckPhone.payload.pin_status === 1
        ) {
          const doLogin = await signInWithPIN(
            uuid,
            access_token,
            phoneNumber,
            pin
          );
          if (
            doLogin &&
            doLogin.payload &&
            doLogin.payload.text === "Success"
          ) {
            console.log(`[+] Logged in successfully`);
            console.log(`[+] Getting profile info...`);
            const profile = await profileInfo(uuid, access_token);
            if (profile && profile.payload) {
              const data = profile.payload;
              const user_name = data.user_name;
              const user_birthday = data.user_birthday;
              const user_email = data.user_email;
              const user_status = data.user_status;
              const user_point = data.user_point;

              console.log(`[+] Name: ${user_name}`);
              console.log(`[+] Birthday: ${user_birthday}`);
              console.log(`[+] Email: ${user_email}`);
              console.log(`[+] Status: ${user_status}`);
              console.log(`[+] Point: ${user_point}`);
              console.log();

              if (fs.existsSync("accounts.json")) {
                const accounts = fs.readFileSync("accounts.json", "utf8");
                const accountsJson = JSON.parse(accounts);

                if (
                  accountsJson.find((account) => account.phone === phoneNumber)
                ) {
                  const index = accountsJson.findIndex(
                    (account) => account.phone === phoneNumber
                  );
                  accountsJson[index] = {
                    phone: phoneNumber,
                    pin: pin,
                    name: user_name,
                    birthday: user_birthday,
                    email: user_email,
                    status: user_status,
                    point: user_point,
                    access_token: access_token,
                    uuid: uuid,
                  };

                  await fs.writeFileSync(
                    "accounts.json",
                    JSON.stringify(accountsJson, null, 2)
                  );
                } else {
                  accountsJson.push({
                    phone: phoneNumber,
                    pin: pin,
                    name: user_name,
                    birthday: user_birthday,
                    email: user_email,
                    status: user_status,
                    point: user_point,
                    access_token: access_token,
                    uuid: uuid,
                  });
                }
                await fs.writeFileSync(
                  "accounts.json",
                  JSON.stringify(accountsJson, null, 2)
                );
              } else {
                await fs.writeFileSync(
                  "accounts.json",
                  JSON.stringify(
                    [
                      {
                        phone: phoneNumber,
                        pin: pin,
                        name: user_name,
                        birthday: user_birthday,
                        email: user_email,
                        status: user_status,
                        point: user_point,
                        access_token: access_token,
                        uuid: uuid,
                      },
                    ],
                    null,
                    2
                  )
                );
              }

              console.log(`Saved to accounts.json`);
            } else {
              console.log(`[+] Failed to get profile info`);
              console.log();
              return;
            }
          } else {
            console.log(`[+] Failed to login`);
            console.log();
            return;
          }
        } else {
          console.log(`Phone number is not registered or pin not set`);
          return;
        }
      } else {
        console.log(`[+] Failed to get token`);
        console.log();
        return;
      }
    } else if (choice === "3") {
      console.clear();
      console.log("Create Account Manual OTP");
      console.log();
      const phoneNumber = await input({
        type: "text",
        name: "phoneNumber",
        message: "Enter Phone Number",
      });
      const refferalCode = await input({
        type: "text",
        name: "refferal",
        message: "Enter Refferal Code",
      });

      console.log();
      if (!phoneNumber || !refferalCode) {
        console.log("Please enter a valid phone number and refferal code");
        return;
      }
      console.log(`Creating account with refferal code ${refferalCode}`);
      console.log();
      const data = await randomUser();
      if (data && data.results) {
        const number = phoneNumber.replace("+", "");
        const { name, gender, email } = data.results[0];
        console.log(`[+] Phone Number: ${phoneNumber}`);

        const uuid = v4();
        const token = await getToken(uuid);
        if (token && token.payload) {
          const access_token = token.payload.access_token;
          const refresh_token = token.payload.refresh_token;

          const doCheckPhone = await checkPhone(uuid, access_token, number);
          if (
            doCheckPhone &&
            doCheckPhone.payload &&
            doCheckPhone.payload.is_registered === 0
          ) {
            console.log(`[+] Phone number is not registered`);
            const reqLoginCode = await reqLogin(uuid, access_token, number);
            if (
              reqLoginCode &&
              reqLoginCode.payload &&
              reqLoginCode.payload.code
            ) {
              console.log(`[+] Request login code success`);
              console.log(`[+] Waiting for code...`);
              const code = await input({
                type: "text",
                name: "code",
                message: "Enter OTP",
              });
              if (!code) {
                console.log("Please enter a valid OTP");
                return;
              }
              if (code) {
                console.log(`[+] Got code ${code}`);
                const signUpData = await signUp(
                  uuid,
                  access_token,
                  number,
                  name.first + " " + name.last,
                  code,
                  refferalCode
                );
                if (
                  signUpData &&
                  signUpData.payload &&
                  signUpData.payload.text === "Success"
                ) {
                  console.log(`[+] Sign up success`);
                  console.log(`[+] Name: ${name.first} ${name.last}`);
                  console.log(`[+] Email: ${email}`);
                  console.log(`[+] Phone: ${number}`);
                  console.log(`[+] Refferal: ${refferalCode}`);
                  console.log(`[+] Access Token: ${access_token}`);
                  console.log(`[+] Refresh Token: ${refresh_token}`);
                  console.log(`[+] Setting PIN`);
                  const doPin = await addPin(
                    uuid,
                    access_token,
                    process.env.DEFAULT_PIN
                  );
                  if (doPin && doPin.payload) {
                    console.log(`[+] PIN set successfully`);
                    console.log(`[+] Setting birthday`);

                    const birthday = dayjs()
                      .subtract(getRandomNumber(20, 30), "year")
                      .add(100, "day")
                      .format("YYYY-MM-DD");
                    const newEmail =
                      name.first.toLowerCase().replace(/\s+/g, "") +
                      `${getRandomNumber(1000000, 9999999)}@gmail.com`;
                    const changeDataResponse = await changeData(
                      uuid,
                      access_token,
                      name.first + " " + name.last,
                      newEmail,
                      birthday
                    );
                    if (
                      changeDataResponse &&
                      changeDataResponse.status != "success"
                    ) {
                      console.log(
                        `[+] Failed to change data ${JSON.stringify(
                          changeDataResponse
                        )}`
                      );
                      console.log();
                      return;
                    }

                    console.log(`[+] Birthday set to ${birthday}`);
                    console.log(`[+] Email set to ${newEmail}`);
                    console.log(`[+] Adding to accounts.json`);

                    if (fs.existsSync("accounts.json")) {
                      const accounts = fs.readFileSync("accounts.json", "utf8");
                      const accountsJson = JSON.parse(accounts);

                      if (
                        accountsJson.find((account) => account.phone === number)
                      ) {
                        const index = accountsJson.findIndex(
                          (account) => account.phone === number
                        );
                        accountsJson[index] = {
                          phone: number,
                          name: name.first + " " + name.last,
                          email: newEmail,
                          birthday: birthday,
                          status: "Active",
                          point: 0,
                          access_token: access_token,
                          uuid: uuid,
                          pin: process.env.DEFAULT_PIN,
                        };

                        await fs.writeFileSync(
                          "accounts.json",
                          JSON.stringify(accountsJson, null, 2)
                        );
                      } else {
                        accountsJson.push({
                          phone: number,
                          name: name.first + " " + name.last,
                          email: newEmail,
                          birthday: birthday,
                          status: "Active",
                          point: 0,
                          access_token: access_token,
                          uuid: uuid,
                          pin: process.env.DEFAULT_PIN,
                        });
                      }
                      await fs.writeFileSync(
                        "accounts.json",
                        JSON.stringify(accountsJson, null, 2)
                      );
                    } else {
                      await fs.writeFileSync(
                        "accounts.json",
                        JSON.stringify(
                          [
                            {
                              phone: number,
                              name: name.first + " " + name.last,
                              email: newEmail,
                              birthday: birthday,
                              status: "Active",
                              point: 0,
                              access_token: access_token,
                              uuid: uuid,
                              pin: process.env.DEFAULT_PIN,
                            },
                          ],
                          null,
                          2
                        )
                      );
                    }

                    console.log(`[+] Saved to accounts.json`);
                    console.log();
                  } else {
                    console.log(`[+] Failed to add pin`);
                    console.log();
                    return;
                  }
                }
              } else {
                console.log(`[+] Failed to get code`);
                console.log();
                return;
              }
            } else {
              console.log(`[+] Failed to request login code`);
              console.log();
              return;
            }
          } else {
            console.log(`Phone number is already registered`);
            return;
          }
        } else {
          console.log(`[+] Failed to get token`);
          console.log();
          return;
        }
      } else {
        console.log(`[+] Failed to get random user data`);
        console.log();
        return;
      }
    } else if (choice === "4") {
      console.clear();
      console.log("Create Account + SMSHub");
      console.log();
      const howMany = await input({
        type: "number",
        name: "howMany",
        message: "How many accounts you want to create?",
        validate: (value) => {
          if (isNaN(value) || value < 1) {
            return "Please enter a valid number";
          }
          return true;
        },
      });
      const refferalCode = await input({
        type: "text",
        name: "refferal",
        message: "Enter Refferal Code",
      });
      console.log();
      console.log(
        `Creating ${howMany} accounts with refferal code ${refferalCode}`
      );
      console.log();
      for (let i = 0; i < howMany; i++) {
        const data = await randomUser();
        if (data && data.results) {
          const { name, gender, email } = data.results[0];
          const balance = await getBalance();
          const splitBalance = balance.split(":");
          const currentBalance = parseFloat(splitBalance[1]);

          console.log(`[+] Current balance: ${currentBalance}`);

          let orderId, number;
          try {
            const numbers = await getNumber();
            const splitNumbers = numbers.split(":");
            const status = splitNumbers[0];
            if (status === "NO_NUMBERS") {
              console.log(`No numbers available`);
              continue;
            }
            if (status === "SERVER_ERROR") {
              console.log(`Server error`);
              continue;
            }
            if (status === "BAD_ACTION") {
              console.log(`Bad action`);
              continue;
            }
            orderId = splitNumbers[1];
            number = splitNumbers[2];
          } catch (error) {
            console.log(`[+] Failed to get numbers`);
            console.log();
            continue;
          }
          const uuid = v4();
          const token = await getToken(uuid);
          if (token && token.payload) {
            const access_token = token.payload.access_token;
            const refresh_token = token.payload.refresh_token;

            const doCheckPhone = await checkPhone(uuid, access_token, number);
            if (
              doCheckPhone &&
              doCheckPhone.payload &&
              doCheckPhone.payload.is_registered === 0
            ) {
              console.log(`[+] Phone number is not registered`);
              const reqLoginCode = await reqLogin(uuid, access_token, number);
              if (
                reqLoginCode &&
                reqLoginCode.payload &&
                reqLoginCode.payload.code
              ) {
                console.log(`[+] Request login code success`);
                console.log(`[+] Waiting for code...`);
                let code;
                let i = 0;
                while (i < 250) {
                  const checkCode = await getCode(orderId);
                  if (checkCode && checkCode !== "STATUS_WAIT_CODE") {
                    const splitCode = checkCode.split(":");
                    code = splitCode[1];
                    break;
                  }
                  i++;
                }
                if (code) {
                  console.log(`[+] Got code ${code}`);
                  const signUpData = await signUp(
                    uuid,
                    access_token,
                    number,
                    name.first + " " + name.last,
                    code,
                    refferalCode
                  );
                  if (
                    signUpData &&
                    signUpData.payload &&
                    signUpData.payload.text === "Success"
                  ) {
                    console.log(`[+] Sign up success`);
                    console.log(`[+] Name: ${name.first} ${name.last}`);
                    console.log(`[+] Email: ${email}`);
                    console.log(`[+] Phone: ${number}`);
                    console.log(`[+] Refferal: ${refferalCode}`);
                    console.log(`[+] Access Token: ${access_token}`);
                    console.log(`[+] Refresh Token: ${refresh_token}`);
                    await setStatus(orderId, "6");
                    console.log(`[+] Setting PIN`);
                    const doPin = await addPin(
                      uuid,
                      access_token,
                      process.env.DEFAULT_PIN
                    );
                    if (doPin && doPin.payload) {
                      console.log(`[+] PIN set successfully`);
                      console.log(`[+] Setting birthday`);

                      const birthday = dayjs()
                        .subtract(getRandomNumber(20, 30), "year")
                        .add(100, "day")
                        .format("YYYY-MM-DD");
                      const newEmail =
                        name.first.toLowerCase().replace(/\s+/g, "") +
                        `${getRandomNumber(1000000, 9999999)}@gmail.com`;
                      const changeDataResponse = await changeData(
                        uuid,
                        access_token,
                        name.first + " " + name.last,
                        newEmail,
                        birthday
                      );
                      if (
                        changeDataResponse &&
                        changeDataResponse.status != "success"
                      ) {
                        console.log(
                          `[+] Failed to change data ${JSON.stringify(
                            changeDataResponse
                          )}`
                        );
                        console.log();
                        continue;
                      }

                      console.log(`[+] Birthday set to ${birthday}`);
                      console.log(`[+] Email set to ${newEmail}`);
                      console.log(`[+] Adding to accounts.json`);

                      if (fs.existsSync("accounts.json")) {
                        const accounts = fs.readFileSync(
                          "accounts.json",
                          "utf8"
                        );
                        const accountsJson = JSON.parse(accounts);

                        if (
                          accountsJson.find(
                            (account) => account.phone === number
                          )
                        ) {
                          const index = accountsJson.findIndex(
                            (account) => account.phone === number
                          );
                          accountsJson[index] = {
                            phone: number,
                            name: name.first + " " + name.last,
                            email: newEmail,
                            birthday: birthday,
                            status: "Active",
                            point: 0,
                            access_token: access_token,
                            uuid: uuid,
                            pin: process.env.DEFAULT_PIN,
                          };

                          await fs.writeFileSync(
                            "accounts.json",
                            JSON.stringify(accountsJson, null, 2)
                          );
                        } else {
                          accountsJson.push({
                            phone: number,
                            name: name.first + " " + name.last,
                            email: newEmail,
                            birthday: birthday,
                            status: "Active",
                            point: 0,
                            access_token: access_token,
                            uuid: uuid,
                            pin: process.env.DEFAULT_PIN,
                          });
                        }
                        await fs.writeFileSync(
                          "accounts.json",
                          JSON.stringify(accountsJson, null, 2)
                        );
                      } else {
                        await fs.writeFileSync(
                          "accounts.json",
                          JSON.stringify(
                            [
                              {
                                phone: number,
                                name: name.first + " " + name.last,
                                email: newEmail,
                                birthday: birthday,
                                status: "Active",
                                point: 0,
                                access_token: access_token,
                                uuid: uuid,
                                pin: process.env.DEFAULT_PIN,
                              },
                            ],
                            null,
                            2
                          )
                        );
                      }

                      console.log(`[+] Saved to accounts.json`);
                      console.log();
                    } else {
                      console.log(`[+] Failed to add pin`);
                      console.log();
                      await setStatus(orderId, "8");
                      continue;
                    }
                  }
                } else {
                  console.log(`[+] Failed to get code`);
                  console.log();
                  await setStatus(orderId, "8");
                  continue;
                }
              } else {
                console.log(`[+] Failed to request login code`);
                console.log(reqLoginCode);
                console.log();
                await setStatus(orderId, "8");
                continue;
              }
            } else {
              console.log(`Phone number is already registered`);
              await setStatus(orderId, "8");
              continue;
            }
          } else {
            console.log(`[+] Failed to get token`);
            console.log();
            await setStatus(orderId, "8");
            continue;
          }
        } else {
          console.log(`[+] Failed to get random user data`);
          console.log();
          continue;
        }
      }
    } else if (choice === "5") {
      console.clear();
      console.log("Create Account + Tokoclaude");
      console.log();
      const howMany = await input({
        type: "number",
        name: "howMany",
        message: "How many accounts you want to create?",
        validate: (value) => {
          if (isNaN(value) || value < 1) {
            return "Please enter a valid number";
          }
          return true;
        },
      });
      const refferalCode = await input({
        type: "text",
        name: "refferal",
        message: "Enter Refferal Code",
      });
      console.log();
      console.log(
        `Creating ${howMany} accounts with refferal code ${refferalCode}`
      );
      console.log();
      for (let i = 0; i < howMany; i++) {
        const data = await randomUser();
        if (data && data.results) {
          const { name, gender, email } = data.results[0];
          const balance = await getBalanceTokoclaude();
          const currentBalance = parseFloat(balance.data.data.saldo);

          console.log(`[+] Current balance: ${currentBalance}`);

          let orderId, number;
          try {
            const numbers = await getNumberTokoclaude();
            if (!numbers.success) {
              if (numbers.data.messages) {
                console.log(
                  `Response from Tokoclaude: ${numbers.data.messages}`
                );
                continue;
              }
            }
            orderId = numbers.data.data.order_id;
            number = numbers.data.data.number;
          } catch (error) {
            console.log(`[+] Failed to get numbers`);
            console.log();
            continue;
          }
          const uuid = v4();
          const token = await getToken(uuid);
          if (token && token.payload) {
            const access_token = token.payload.access_token;
            const refresh_token = token.payload.refresh_token;

            const doCheckPhone = await checkPhone(uuid, access_token, number);
            if (
              doCheckPhone &&
              doCheckPhone.payload &&
              doCheckPhone.payload.is_registered === 0
            ) {
              console.log(`[+] Phone number is not registered`);
              const reqLoginCode = await reqLogin(uuid, access_token, number);
              if (
                reqLoginCode &&
                reqLoginCode.payload &&
                reqLoginCode.payload.code
              ) {
                console.log(`[+] Request login code success`);
                console.log(`[+] Waiting for code...`);
                let code;
                let i = 0;
                while (i < 250) {
                  const checkCode = await getCodeTokoclaude(orderId);
                  if (checkCode && checkCode.success) {
                    if (checkCode.data.data[0].sms != null) {
                      code = JSON.parse(checkCode.data.data[0].sms)[0];
                      code = code.sms.match(/\d{5}/g).join("");
                      break;
                    }
                  }
                  await new Promise((resolve) => setTimeout(resolve, 5000));
                  i++;
                }
                if (code) {
                  console.log(`[+] Got code ${code}`);
                  const signUpData = await signUp(
                    uuid,
                    access_token,
                    number,
                    name.first + " " + name.last,
                    code,
                    refferalCode
                  );
                  if (
                    signUpData &&
                    signUpData.payload &&
                    signUpData.payload.text === "Success"
                  ) {
                    console.log(`[+] Sign up success`);
                    console.log(`[+] Name: ${name.first} ${name.last}`);
                    console.log(`[+] Email: ${email}`);
                    console.log(`[+] Phone: ${number}`);
                    console.log(`[+] Refferal: ${refferalCode}`);
                    console.log(`[+] Access Token: ${access_token}`);
                    console.log(`[+] Refresh Token: ${refresh_token}`);
                    await setStatusTokoclaude(orderId, "6");
                    console.log(`[+] Setting PIN`);
                    const doPin = await addPin(
                      uuid,
                      access_token,
                      process.env.DEFAULT_PIN
                    );
                    if (doPin && doPin.payload) {
                      console.log(`[+] PIN set successfully`);
                      console.log(`[+] Setting birthday`);

                      const birthday = dayjs()
                        .subtract(getRandomNumber(20, 30), "year")
                        .add(100, "day")
                        .format("YYYY-MM-DD");
                      const newEmail =
                        name.first.toLowerCase().replace(/\s+/g, "") +
                        `${getRandomNumber(1000000, 9999999)}@gmail.com`;
                      const changeDataResponse = await changeData(
                        uuid,
                        access_token,
                        name.first + " " + name.last,
                        newEmail,
                        birthday
                      );
                      if (
                        changeDataResponse &&
                        changeDataResponse.status != "success"
                      ) {
                        console.log(
                          `[+] Failed to change data ${JSON.stringify(
                            changeDataResponse
                          )}`
                        );
                        console.log();
                        continue;
                      }

                      console.log(`[+] Birthday set to ${birthday}`);
                      console.log(`[+] Email set to ${newEmail}`);
                      console.log(`[+] Adding to accounts.json`);

                      if (fs.existsSync("accounts.json")) {
                        const accounts = fs.readFileSync(
                          "accounts.json",
                          "utf8"
                        );
                        const accountsJson = JSON.parse(accounts);

                        if (
                          accountsJson.find(
                            (account) => account.phone === number
                          )
                        ) {
                          const index = accountsJson.findIndex(
                            (account) => account.phone === number
                          );
                          accountsJson[index] = {
                            phone: number,
                            name: name.first + " " + name.last,
                            email: newEmail,
                            birthday: birthday,
                            status: "Active",
                            point: 0,
                            access_token: access_token,
                            uuid: uuid,
                            pin: process.env.DEFAULT_PIN,
                          };

                          await fs.writeFileSync(
                            "accounts.json",
                            JSON.stringify(accountsJson, null, 2)
                          );
                        } else {
                          accountsJson.push({
                            phone: number,
                            name: name.first + " " + name.last,
                            email: newEmail,
                            birthday: birthday,
                            status: "Active",
                            point: 0,
                            access_token: access_token,
                            uuid: uuid,
                            pin: process.env.DEFAULT_PIN,
                          });
                        }
                        await fs.writeFileSync(
                          "accounts.json",
                          JSON.stringify(accountsJson, null, 2)
                        );
                      } else {
                        await fs.writeFileSync(
                          "accounts.json",
                          JSON.stringify(
                            [
                              {
                                phone: number,
                                name: name.first + " " + name.last,
                                email: newEmail,
                                birthday: birthday,
                                status: "Active",
                                point: 0,
                                access_token: access_token,
                                uuid: uuid,
                                pin: process.env.DEFAULT_PIN,
                              },
                            ],
                            null,
                            2
                          )
                        );
                      }

                      console.log(`[+] Saved to accounts.json`);
                      console.log();
                    } else {
                      console.log(`[+] Failed to add pin`);
                      console.log();
                      await setStatusTokoclaude(orderId, "8");
                      continue;
                    }
                  }
                } else {
                  console.log(`[+] Failed to get code`);
                  console.log();
                  await setStatusTokoclaude(orderId, "8");
                  continue;
                }
              } else {
                console.log(`[+] Failed to request login code`);
                console.log(reqLoginCode);
                console.log();
                await setStatusTokoclaude(orderId, "8");
                continue;
              }
            } else {
              console.log(`Phone number is already registered`);
              await setStatusTokoclaude(orderId, "8");
              continue;
            }
          } else {
            console.log(`[+] Failed to get token`);
            console.log();
            await setStatusTokoclaude(orderId, "8");
            continue;
          }
        } else {
          console.log(`[+] Failed to get random user data`);
          console.log();
          continue;
        }
      }
    } else if (choice === "6") {
      console.clear();
      console.log("Create Account + Turbootp");
      console.log();
      const howMany = await input({
        type: "number",
        name: "howMany",
        message: "How many accounts you want to create?",
        validate: (value) => {
          if (isNaN(value) || value < 1) {
            return "Please enter a valid number";
          }
          return true;
        },
      });
      const refferalCode = await input({
        type: "text",
        name: "refferal",
        message: "Enter Refferal Code",
      });
      console.log();
      console.log(
        `Creating ${howMany} accounts with refferal code ${refferalCode}`
      );
      console.log();
      for (let i = 0; i < howMany; i++) {
        const data = await randomUser();
        if (data && data.results) {
          const { name, gender, email } = data.results[0];
          const balance = await getBalanceTurbootp();
          const currentBalance = parseFloat(balance.data.data.saldo);

          console.log(`[+] Current balance: ${currentBalance}`);

          let orderId, number;
          try {
            const numbers = await getNumberTurbootp();
            if (!numbers.success) {
              if (numbers.data.messages) {
                console.log(`Response from Turbootp: ${numbers.data.messages}`);
                continue;
              }
            }
            orderId = numbers.data.data.order_id;
            number = numbers.data.data.number;
          } catch (error) {
            console.log(`[+] Failed to get numbers`);
            console.log();
            continue;
          }
          const uuid = v4();
          const token = await getToken(uuid);
          if (token && token.payload) {
            const access_token = token.payload.access_token;
            const refresh_token = token.payload.refresh_token;

            const doCheckPhone = await checkPhone(uuid, access_token, number);
            if (
              doCheckPhone &&
              doCheckPhone.payload &&
              doCheckPhone.payload.is_registered === 0
            ) {
              console.log(`[+] Phone number is not registered`);
              const reqLoginCode = await reqLogin(uuid, access_token, number);
              if (
                reqLoginCode &&
                reqLoginCode.payload &&
                reqLoginCode.payload.code
              ) {
                console.log(`[+] Request login code success`);
                console.log(`[+] Waiting for code...`);
                let code;
                let i = 0;
                while (i < 250) {
                  const checkCode = await getCodeTurbootp(orderId);
                  if (checkCode && checkCode.success) {
                    if (checkCode.data.data[0].sms != null) {
                      code = JSON.parse(checkCode.data.data[0].sms)[0];
                      code = code.sms.match(/\d{5}/g).join("");
                      break;
                    }
                  }
                  await new Promise((resolve) => setTimeout(resolve, 5000));
                  i++;
                }
                if (code) {
                  console.log(`[+] Got code ${code}`);
                  const signUpData = await signUp(
                    uuid,
                    access_token,
                    number,
                    name.first + " " + name.last,
                    code,
                    refferalCode
                  );
                  if (
                    signUpData &&
                    signUpData.payload &&
                    signUpData.payload.text === "Success"
                  ) {
                    console.log(`[+] Sign up success`);
                    console.log(`[+] Name: ${name.first} ${name.last}`);
                    console.log(`[+] Email: ${email}`);
                    console.log(`[+] Phone: ${number}`);
                    console.log(`[+] Refferal: ${refferalCode}`);
                    console.log(`[+] Access Token: ${access_token}`);
                    console.log(`[+] Refresh Token: ${refresh_token}`);
                    await setStatusTurbootp(orderId, "6");
                    console.log(`[+] Setting PIN`);
                    const doPin = await addPin(
                      uuid,
                      access_token,
                      process.env.DEFAULT_PIN
                    );
                    if (doPin && doPin.payload) {
                      console.log(`[+] PIN set successfully`);
                      console.log(`[+] Setting birthday`);

                      const birthday = dayjs()
                        .subtract(getRandomNumber(20, 30), "year")
                        .add(100, "day")
                        .format("YYYY-MM-DD");
                      const newEmail =
                        name.first.toLowerCase().replace(/\s+/g, "") +
                        `${getRandomNumber(1000000, 9999999)}@gmail.com`;
                      const changeDataResponse = await changeData(
                        uuid,
                        access_token,
                        name.first + " " + name.last,
                        newEmail,
                        birthday
                      );
                      if (
                        changeDataResponse &&
                        changeDataResponse.status != "success"
                      ) {
                        console.log(
                          `[+] Failed to change data ${JSON.stringify(
                            changeDataResponse
                          )}`
                        );
                        console.log();
                        continue;
                      }

                      console.log(`[+] Birthday set to ${birthday}`);
                      console.log(`[+] Email set to ${newEmail}`);
                      console.log(`[+] Adding to accounts.json`);

                      if (fs.existsSync("accounts.json")) {
                        const accounts = fs.readFileSync(
                          "accounts.json",
                          "utf8"
                        );
                        const accountsJson = JSON.parse(accounts);

                        if (
                          accountsJson.find(
                            (account) => account.phone === number
                          )
                        ) {
                          const index = accountsJson.findIndex(
                            (account) => account.phone === number
                          );
                          accountsJson[index] = {
                            phone: number,
                            name: name.first + " " + name.last,
                            email: newEmail,
                            birthday: birthday,
                            status: "Active",
                            point: 0,
                            access_token: access_token,
                            uuid: uuid,
                            pin: process.env.DEFAULT_PIN,
                          };

                          await fs.writeFileSync(
                            "accounts.json",
                            JSON.stringify(accountsJson, null, 2)
                          );
                        } else {
                          accountsJson.push({
                            phone: number,
                            name: name.first + " " + name.last,
                            email: newEmail,
                            birthday: birthday,
                            status: "Active",
                            point: 0,
                            access_token: access_token,
                            uuid: uuid,
                            pin: process.env.DEFAULT_PIN,
                          });
                        }
                        await fs.writeFileSync(
                          "accounts.json",
                          JSON.stringify(accountsJson, null, 2)
                        );
                      } else {
                        await fs.writeFileSync(
                          "accounts.json",
                          JSON.stringify(
                            [
                              {
                                phone: number,
                                name: name.first + " " + name.last,
                                email: newEmail,
                                birthday: birthday,
                                status: "Active",
                                point: 0,
                                access_token: access_token,
                                uuid: uuid,
                                pin: process.env.DEFAULT_PIN,
                              },
                            ],
                            null,
                            2
                          )
                        );
                      }

                      console.log(`[+] Saved to accounts.json`);
                      console.log();
                    } else {
                      console.log(`[+] Failed to add pin`);
                      console.log();
                      await setStatusTurbootp(orderId, "8");
                      continue;
                    }
                  }
                } else {
                  console.log(`[+] Failed to get code`);
                  console.log();
                  await setStatusTurbootp(orderId, "8");
                  continue;
                }
              } else {
                console.log(`[+] Failed to request login code`);
                console.log(reqLoginCode);
                console.log();
                await setStatusTurbootp(orderId, "8");
                continue;
              }
            } else {
              console.log(`Phone number is already registered`);
              await setStatusTurbootp(orderId, "8");
              continue;
            }
          } else {
            console.log(`[+] Failed to get token`);
            console.log();
            await setStatusTurbootp(orderId, "8");
            continue;
          }
        } else {
          console.log(`[+] Failed to get random user data`);
          console.log();
          continue;
        }
      }
    } else if (choice === "7") {
      console.clear();
      console.log("Check Voucher");
      console.log();

      const readAccounts = fs.readFileSync("accounts.json", "utf8");
      const accounts = JSON.parse(readAccounts);

      const columns = ["Nomor Telepon", "Nama"];
      const data = accounts.map((account) => [account.phone, account.name]);

      const tableData = [columns, ...data];
      console.log(table(tableData));

      const accountIndex = await select({
        type: "select",
        name: "accountIndex",
        message: "Select an account",
        choices: accounts.map((account) => {
          return {
            name: `${account.phone} - ${account.name}`,
            value: account,
          };
        }),
      });

      if (!accountIndex) {
        console.log("Please select an account");
        return;
      }

      console.log();

      const uuid = accountIndex.uuid;
      const access_token = accountIndex.access_token;

      console.log(`[+] Getting profile info...`);
      const profile = await profileInfo(uuid, access_token);
      if (profile && profile.payload) {
        const data = profile.payload;
        const user_name = data.user_name;
        const user_birthday = data.user_birthday;
        const user_email = data.user_email;
        const user_status = data.user_status;
        const user_point = data.user_point;

        console.log(`[+] Name: ${user_name}`);
        console.log(`[+] Birthday: ${user_birthday}`);
        console.log(`[+] Email: ${user_email}`);
        console.log(`[+] Status: ${user_status}`);
        console.log(`[+] Point: ${user_point}`);

        const vouchers = await checkVouchers(uuid, access_token);
        if (vouchers && vouchers.payload) {
          const dataVouchers = vouchers.payload.data;
          const columns = ["Kode Voucher", "Nama Voucher", "Expired"];
          const data = dataVouchers.map((voucher) => [
            voucher.vc_code,
            voucher.prm_name,
            voucher.prm_end,
          ]);

          const tableData = [columns, ...data];
          console.log(table(tableData));
        } else {
          console.log(`[+] Failed to get vouchers`);
          console.log();
          return;
        }
      } else {
        console.log(`[+] Failed to get profile info\n`);
        console.log();
        return;
      }
    }
  }
})();
