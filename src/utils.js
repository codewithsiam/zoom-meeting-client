import KJUR from "jsrsasign";

export const generateSignature = (topic, role, sdkKey, sdkSecret) => {
    const iat = Math.floor(Date.now() / 1000) - 30;
    const exp = iat + 60 * 60;
    const payload = { sdkKey, mn: topic, role, iat, exp, tokenExp: exp };

    return KJUR.jws.JWS.sign(
        "HS256",
        JSON.stringify({ alg: "HS256", typ: "JWT" }),
        JSON.stringify(payload),
        sdkSecret
    );
};
