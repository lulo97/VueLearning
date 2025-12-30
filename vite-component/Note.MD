1. Registration componenent

- Global
    + Import in main.ts and using anywhere in <template> of any componenet
    + Used for shared/common component (Button, Popup)

- Local
    + Import in parent componenet

2. File .vue

File .vue = <script> + <template> + <style>

caveat (lưu ý)

3. Vue compiler + Vite bundle

- Writing .vue file
- @vue/compiler-sfc parse .vue file into js, css (html created inside js)
- Vite bundle js, css
- Browser read bundled files
* <script setup> is compile entirely into JS -> Does not exist in runtime of browser (React using runtime JSX = Slower)

4. Props vs Emit

Parent  ── props ──▶ Child
Parent ◀─ emits ─── Child

Exercise:
- Passing props from parent to child
- Child can't change props of parent directly
- Child can emit event to parent to ask for change state of parent

Static props: <Child name="Luong" />
Dynamic props: <Child :name="user.name" />

With typescript, props can has validation

5. v-model

Declare: v-model:state_name="state_name" in props of child is equivalent to
    <Child
        :state_name="state_name"
        @update:state_name="onChangeStateName(new_state)"
    />
- Calling emit('update:state_name', new_state) in Child to update state

6. Attribute Inheritance

<Child class="123" id="456" placeholder="abc" ... />

Default html attributes will be auto apply when component render if attributes declared in parent.

7. Build-in directive

v-once = render only one
v-memo = compare new props vs old props, if same then do nothing