import { SignInPage } from '@backstage/core-components';
import {
  configApiRef,
  createFrontendModule,
  githubAuthApiRef,
  useApi,
} from '@backstage/frontend-plugin-api';
import { SignInPageBlueprint } from '@backstage/plugin-app-react';
import type { SignInPageProps } from '@backstage/plugin-app-react';

const githubProvider = {
  id: 'github-auth-provider',
  title: 'GitHub',
  message: 'Entrar com a conta do GitHub',
  apiRef: githubAuthApiRef,
};

// Guest só pro `yarn start` local. O app-config.yaml base declara
// auth.providers.guest e é mesclado com o de produção, então não basta checar
// se ele existe: em produção (auth.environment: production) o botão some, e o
// backend também recusa o guest com NODE_ENV=production.
const CustomSignInPage = (props: SignInPageProps) => {
  const config = useApi(configApiRef);
  const hasGuest =
    config.has('auth.providers.guest') &&
    config.getOptionalString('auth.environment') !== 'production';
  return (
    <SignInPage
      {...props}
      providers={hasGuest ? ['guest', githubProvider] : [githubProvider]}
    />
  );
};

export const signInModule = createFrontendModule({
  pluginId: 'app',
  extensions: [
    SignInPageBlueprint.make({
      params: {
        loader: async () => CustomSignInPage,
      },
    }),
  ],
});
