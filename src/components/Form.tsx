import React from "react";
import Input from "./Input";
import Button from "./Button";
import SelectOption from "./SelectOption";
import { Subject } from "@/helper/generateSchedules";
import { DAYS, UI_TEXTS } from "@/constants/arabic";

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
          label="اسم المادة"
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input
          id="code"
          label="كود المادة"
          type="text"
          name="code"
          value={formData.code || ""}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          required
        />
        <Input
          id="group"
          label="المجموعة"
          type="number"
          name="group"
          value={formData.group || ""}
          onChange={(e) => setFormData({ ...formData, group: e.target.value })}
          required
          min="1"
        />
        <SelectOption
          id="primaryDay"
          label="يوم المحاضرة"
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
          label="بداية فترة المحاضرة"
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
          label="نهاية فترة المحاضرة"
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
          label="يوم السكشن (اختياري)"
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
          label="بداية فترة السكشن (اختياري)"
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
          label="نهاية فترة السكشن (اختياري)"
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
        <Input
          id="units"
          label="عدد الوحدات"
          type="number"
          name="units"
          value={formData.units || ""}
          onChange={(e) =>
            setFormData({ ...formData, units: parseInt(e.target.value) })
          }
          required
          min="1"
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
