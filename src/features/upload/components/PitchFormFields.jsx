/**
 * Includes:
    Title (max 80 chars)
    Description (max 300 chars)
    Funding Stage dropdown
    Ask summary
 */


import FormField from "../../../components/FormField";

export default function PitchFormFields({ form, update, errors = {} }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow mt-4 space-y-4">

      {/* Title */}
      <FormField
        label="Title"
        name="title"
        value={form.title}
        onChange={(e) => update("title", e.target.value.slice(0, 80))}
        placeholder="Title (max 80 chars)"
        error={errors.title}
        required
        helpText={`${form.title?.length || 0}/80 characters`}
      />

      {/* Description */}
      <FormField
        as="textarea"
        label="Short Description"
        name="description"
        value={form.description}
        onChange={(e) => update("description", e.target.value.slice(0, 300))}
        placeholder="Describe your idea (max 300 chars)"
        error={errors.description}
        required
        rows={4}
        helpText={`${form.description?.length || 0}/300 characters`}
      />

      {/* Funding Stage */}
      <FormField
        as="select"
        label="Funding Stage"
        name="stage"
        value={form.stage}
        onChange={(e) => update("stage", e.target.value)}
        error={errors.stage}
        required
      >
        <option value="">Select Stage</option>
        <option value="Pre-seed">Pre-seed</option>
        <option value="Seed">Seed</option>
        <option value="Series A">Series A</option>
      </FormField>

      {/* Ask */}
      <FormField
        label="Funding Ask"
        name="ask"
        value={form.ask}
        onChange={(e) => update("ask", e.target.value)}
        placeholder='Example: "$50k for 6 months runway"'
        error={errors.ask}
        required
      />
    </div>
  );
}
