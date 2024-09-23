import React from "react";
import Input from "./Input";
import Button from "./Button";
import SelectOption from "./SelectOption";
import { Subject } from "@/helpers/generateSchedules";
import { DAYS, UI_TEXTS, FORM_LABELS } from "@/constants/arabic";

interface FormProps {
  formData: Partial<Subject>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Subject>>>;
  addOrUpdateSubject: (e: React.FormEvent<HTMLFormElement>) => void;
  resetForm: () => void;
  editingSubject: Subject | null;
}

const Form: React.FC<FormProps> = ({
  formData,
  setFormData,
  addOrUpdateSubject,
  resetForm,
  editingSubject,
}) => {
  const periodOptions = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <form onSubmit={addOrUpdateSubject} className="mb-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Input
          id="name"
          label={FORM_LABELS.SUBJECT_NAME}
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input
          id="code"
          label={FORM_LABELS.SUBJECT_CODE}
          type="text"
          name="code"
          value={formData.code || ""}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          required
        />
        <Input
          id="group"
          label={FORM_LABELS.GROUP}
          type="number"
          name="group"
          value={formData.group || ""}
          onChange={(e) => setFormData({ ...formData, group: e.target.value })}
          required
          min="1"
        />
        <Input
          id="units"
          label={FORM_LABELS.UNITS}
          type="number"
          name="units"
          value={formData.units || ""}
          onChange={(e) =>
            setFormData({ ...formData, units: parseInt(e.target.value) })
          }
          required
          min="1"
        />
        <SelectOption
          id="primaryDay"
          label={FORM_LABELS.LECTURE_DAY}
          name="primaryDay"
          value={formData.primaryDay !== undefined ? formData.primaryDay : ""}
          onChange={(e) =>
            setFormData({ ...formData, primaryDay: parseInt(e.target.value) })
          }
          required
          options={DAYS.map((day, index) => ({ value: index, label: day }))}
        />
        <SelectOption
          id="primaryStartPeriod"
          label={FORM_LABELS.LECTURE_START}
          name="primaryStartPeriod"
          value={formData.primaryStartPeriod || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              primaryStartPeriod: parseInt(e.target.value),
            })
          }
          required
          options={periodOptions.map((period) => ({
            value: period,
            label: period.toString(),
          }))}
        />
        <SelectOption
          id="primaryEndPeriod"
          label={FORM_LABELS.LECTURE_END}
          name="primaryEndPeriod"
          value={formData.primaryEndPeriod || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              primaryEndPeriod: parseInt(e.target.value),
            })
          }
          required
          options={periodOptions.map((period) => ({
            value: period,
            label: period.toString(),
          }))}
        />
        <SelectOption
          id="secondaryDay"
          label={FORM_LABELS.SECTION_DAY}
          name="secondaryDay"
          value={
            formData.secondaryDay !== undefined ? formData.secondaryDay : ""
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              secondaryDay:
                e.target.value === "" ? undefined : parseInt(e.target.value),
            })
          }
          options={DAYS.map((day, index) => ({ value: index, label: day }))}
        />
        <SelectOption
          id="secondaryStartPeriod"
          label={FORM_LABELS.SECTION_START}
          name="secondaryStartPeriod"
          value={
            formData.secondaryStartPeriod !== undefined
              ? formData.secondaryStartPeriod
              : ""
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              secondaryStartPeriod:
                e.target.value === "" ? undefined : parseInt(e.target.value),
            })
          }
          options={periodOptions.map((period) => ({
            value: period,
            label: period.toString(),
          }))}
        />
        <SelectOption
          id="secondaryEndPeriod"
          label={FORM_LABELS.SECTION_END}
          name="secondaryEndPeriod"
          value={
            formData.secondaryEndPeriod !== undefined
              ? formData.secondaryEndPeriod
              : ""
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              secondaryEndPeriod:
                e.target.value === "" ? undefined : parseInt(e.target.value),
            })
          }
          options={periodOptions.map((period) => ({
            value: period,
            label: period.toString(),
          }))}
        />
      </div>
      <div className="flex justify-between gap-4">
        <Button type="submit" className="bg-blue-500 hover:bg-blue-600 w-1/2">
          {editingSubject ? UI_TEXTS.EDIT : UI_TEXTS.ADD_SUBJECT}
        </Button>
        <Button
          onClick={resetForm}
          className="bg-gray-500 hover:bg-gray-600 w-1/2"
        >
          {UI_TEXTS.RESET_FORM}
        </Button>
      </div>
    </form>
  );
};

export default Form;
