// export type ForgedmartCdkConnectorAuth = never; 

import { TokenOperationHandlerAuth } from "@trayio/cdk-dsl/dist/connector/operation/OperationHandler";

export type UserAuth = {
    access_token: string,
}

export type AppAuth = {
    //OAuth app credentials
}

export type ForgedmartCdkConnectorAuth = TokenOperationHandlerAuth<UserAuth,AppAuth>