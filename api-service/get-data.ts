import axios from "axios";
import {message} from "antd";

export function GetData(url: string, params?: {}) {
    const headers = {
        "Content-Type": "application/json",
    };

    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                headers: headers,
                params
            })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                message.error("Something went wrong");
                reject(error);
            });
    });
}
