import { onBeforeUnmount, onMounted, type Ref } from "vue";

export const useClickOutside = (
  el_target_ref: Ref<HTMLDivElement>,
  callback_fn: () => void
) => {
  if (!el_target_ref) return;

  const listener = (e: Event) => {
    if (
      e.target == el_target_ref.value ||
      e.composedPath().includes(el_target_ref.value)
    ) {
      return;
    }

    if (typeof callback_fn == "function") {
      callback_fn();
    }
  };

  onMounted(() => {
    window.addEventListener("click", listener);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("click", listener);
  });
  // return { listener };
};
