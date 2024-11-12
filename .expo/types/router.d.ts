/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/index` | `/(tabs)/account` | `/(tabs)/create` | `/(tabs)/messages` | `/(tabs)/search` | `/_sitemap` | `/account` | `/create` | `/messages` | `/modal` | `/search`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
