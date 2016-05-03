require('reflect-metadata')
require('zone.js')
const {provide, RootRenderer} = require('angular2/core')
const {bootstrap} = require('angular2/platform/browser')
const AppComponent = require('./app.component')
const MyRootRenderer = require('./my-renderer.service')

bootstrap(AppComponent, [
  provide(RootRenderer, {useClass: MyRootRenderer})
])
