Reactivity in VueJS

ref()
- Can used to store primitive values (string, number, bool) or object/array
- Any change in ref will cause render (even with deeply nested object)
- In <script> ref must be access via ".value"
- In <template> ref can be access directly
- nextTick() is a build-in function in VueJS allow to process next logic after a state updated because state update is not synchronously
- One tick can have multiple state changes

reactive()
- Must passing init value is an object (primitive values will cause error)
- reactive() can be access directly without ".value" keyword
- reactive() return a js Proxy() object
- reactive is limited at some point so VueJS document suggest using ref() primary

computed()
- A method run only state related change
- Usecase:
    + Abstract heavy display logic in template into one method
    + Cache result so that only input change then it run again