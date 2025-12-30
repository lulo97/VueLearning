import { reactive, ref } from "vue";

//This worked because vue catch changed and rerender by reactive()
// export const toastStore = reactive({
//     messages: []
// })

//This not work because vue can't detect change
// export const toastStore = {
//   messages: [] as { message: string; id: number }[],
// };

//Can use ref() as well, but reactive() aimed for complex objects or arrays
export const toastStore = ref({
  messages: [] as { message: string; id: number }[],
});

export function showToast(message: string, timeout = 2000) {
  const id = Date.now();

  toastStore.value.messages.push({ message, id });

  setTimeout(() => {
    const remove_message = toastStore.value.messages.find(
      (ele: { id: number }) => ele.id == id
    );

    if (!remove_message) return;

    toastStore.value.messages.splice(remove_message.id, 1);
  }, timeout);
}
