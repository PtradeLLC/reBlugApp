import { OperationHandlerSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerSetup';
import { ForgedmartCdkConnectorAuth } from '../ForgedmartCdkConnectorAuth';
import { GetContactsInput } from './input';
import { GetContactsOutput } from './output';

export const getContactsHandler =
	OperationHandlerSetup.configureHandler<
		ForgedmartCdkConnectorAuth,
		GetContactsInput,
		GetContactsOutput
	>((handler) =>
		handler.usingHttp((http) =>
			http
				.get('https://domain.com/endpoint/:id')
				.handleRequest((ctx, input, request) =>
					request.addPathParameter('id', input.id.toString()).withoutBody()
				)
				.handleResponse((ctx, input, response) =>
					response.parseWithBodyAsJson()
				)
		)
	);
