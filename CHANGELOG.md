# v3.0--beta

* Fixed Vue 3 compatibility
  * Read about the migration from Vue 2 [here](https://v3.vuejs.org/guide/migration/introduction.html)
* Fixed consistent attribute inheritance
* Removed FormElementMixin.js

### Components
* **Avatar**
  * Removed prop `user`
  * Changed prop `user.avatar` to `avatarUrl`
  * Changed prop `user.name` to `name`
  * Changed prop `user.email` to `id`
* **Autocomplete**
  * Added a default filter function
  * Added prop `filterFunction` to create a custom filter for data
* **Button**
  * Added `outlined` prop
  * Removed deprecated `type` prop
  * Removed deprecated `size` prop
  * Removed `icon` prop
  * Removed `rounded` prop
* **Checkbox**
  * Added `label` prop
  * Removed `type` prop
  * Require the disabled css attribute to have a value
* **Dropdown**
  * Removed selectable items. Items are only available as links now.
* **Field**
  * Added CSS variables to `.field` and `.label`
* **FileUpload** _New!_
* **Icon**
  * Added accessibility
  * Fixed attribute inheritance on double elements
  * Removed wrapper
* **List**
  * Changed slot to loop through `items` prop
* **ListItem**
  * Added option to create a link with the `href` attribute
* **Input** 
  * Removed `isNarrow` prop. Set expanded to false instead
  * Removed `loading` prop
* **Radio**
  * Require the disabled css attribute to have a value
  * Removed indeterminate css
* **Range**
  * Changed prop `hasInput` to `withInput`
* **Select**
  * Added `border` prop
  * Changed `placeholder` prop types from [String, Number, Boolean] to String
  * Changed `label` prop types from [String, Number, Boolean] to String
  * Fixed auto width. It now has to be enabled manually.
  * Changed `maxWidth` prop to `autoWidthMax`
* **Switch**
  * Added `label` prop
  * Removed `type` prop
  * Removed `size` prop
  * Fixed `disabled` CSS so it needs a value i.e `disabled[type="true"]`
* **Tags**
  * Added optional close button
* **TagsInput** _New!_
* **Textarea**
  * Changed `expanded` prop to `true` as default
  * Changed `value` prop to only accept `String` value
  * Removed `loading` prop
  * Removed `transparent` prop
