<template>
  <div class="add-modal">
    <q-btn
      unelevated
      label="Add new customer"
      color="primary"
      style="padding: 0px 16px; border-radius: 8px; text-transform: none"
      @click="toggleModal()"
    />

    <q-dialog persistent v-model="modal">
      <q-card style="width: 450px; border-radius: 18px">
        <q-card-section
          style="padding: 24px; background-color: rgb(26, 115, 232)"
        >
          <div class="text-h6" style="color: rgb(255, 255, 255)">
            Add a document
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll" style="padding: 24px; max-height: 50vh">
          <div class="row">
            <div class="col">
              <div style="padding-bottom: 28px">
                <div
                  style="
                    font-size: 13px;
                    color: rgba(0, 0, 0, 0.55);
                    padding-bottom: 8px;
                  "
                >
                  Full name
                </div>

                <q-input outlined dense v-model="customer.fullName" />
              </div>

              <div class="row">
                <div class="col" style="padding-right: 16px">
                  <div style="padding-bottom: 28px">
                    <div
                      style="
                        font-size: 13px;
                        color: rgba(0, 0, 0, 0.55);
                        padding-bottom: 8px;
                      "
                    >
                      Phone number
                    </div>

                    <q-input
                      outlined
                      dense
                      mask="#### - ####"
                      v-model="customer.phoneNumber"
                    />
                  </div>
                </div>

                <div class="col" style="padding-left: 16px">
                  <div style="padding-bottom: 28px">
                    <div
                      style="
                        font-size: 13px;
                        color: rgba(0, 0, 0, 0.55);
                        padding-bottom: 8px;
                      "
                    >
                      Document
                    </div>

                    <q-input
                      outlined
                      dense
                      mask="######## - #"
                      v-model="customer.dui"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div
                  style="
                    font-size: 13px;
                    color: rgba(0, 0, 0, 0.55);
                    padding-bottom: 8px;
                  "
                >
                  Address
                </div>

                <q-input
                  outlined
                  dense
                  type="textarea"
                  v-model="customer.address"
                />
              </div>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" style="padding: 24px">
          <q-btn
            flat
            label="Cancel"
            style="
              padding: 0px 16px;
              border-radius: 8px;
              color: rgba(0, 0, 0, 0.55);
              text-transform: none;
            "
            @click="toggleModal()"
          />

          <q-btn
            unelevated
            label="Save"
            color="primary"
            style="padding: 0px 16px; border-radius: 8px; text-transform: none"
            :disabled="validateFields()"
            @click="addCustomer()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";

import { useFirestoreStore } from "stores/useFirestoreStore";

export default defineComponent({
  name: "AddModal",

  setup() {
    const { addDocument } = useFirestoreStore();

    const modal = ref(false);

    const customer = reactive({
      fullName: "",
      dui: "",
      phoneNumber: "",
      address: "",
    });

    const toggleModal = () => {
      modal.value = !modal.value;
    };

    const validateFields = () => {
      if (
        customer.fullName.trim().length === 0 ||
        customer.phoneNumber.trim().length < 11 ||
        customer.dui.trim().length < 12 ||
        customer.address.trim().length === 0
      ) {
        return true;
      } else {
        return false;
      }
    };

    const resetFields = () => {
      customer.fullName = "";
      customer.phoneNumber = "";
      customer.dui = "";
      customer.address = "";
    };

    const addCustomer = async () => {
      const result = await addDocument("customers", customer);

      resetFields();
    };

    return {
      modal,
      customer,
      toggleModal,
      validateFields,
      resetFields,
      addDocument,
      addCustomer,
    };
  },
});
</script>
