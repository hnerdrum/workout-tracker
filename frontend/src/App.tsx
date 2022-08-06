import { useForm } from 'react-hook-form'
import './index.css'
import { validateDate, validateNumber } from './validators';
import { SimpleInput } from './SimpleInput';
import { SimpleTextArea } from './SimpleTextArea';
import { SimpleSelect } from './SimpleSelect';

type Workout = {
  date: Date;
  distance: number;
  duration: number;
  averageSpeed: number;
  heartRate: number;
  mode: string;
  rating: number;
  description: string;
}

export const WORKOUT_FIELDS: Record<keyof Workout, string> = {
  date: "date",
  distance: "distance",
  duration: "duration",
  averageSpeed: "averageSpeed",
  heartRate: "heartRate",
  mode: "mode",
  rating: "rating",
  description: "description",
}

enum WorkoutMode {
  Slow = "Slow",
  Long = "Long",
  Threshold = "Threshold",
  Tempo = "Tempo"
}

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (workout: any) => {
    console.log(workout)
  }

  return (
    <form className="pt-8 space-y-6 sm:pt-10 sm:space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">Register a workout</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Register your workout so the whole world can admire your fitness.</p>
      </div>
      
      <div className="space-y-6 sm:space-y-5">
        <SimpleInput
          label="Date"
          type="datetime-local"
          errorMessage={errors.date?.message as (string | undefined)}
          {...register(WORKOUT_FIELDS.date, { required: "This is required", validate: validateDate })}
        />
        <SimpleInput
          label="Distance"
          inputMode="numeric"
          type="text"
          errorMessage={errors.distance?.message as (string | undefined)}
          {...register(WORKOUT_FIELDS.distance, {
            required: "This is required",
            min: { value: 0, message: "Workout distance must be greater than 0" },
            validate: validateNumber 
          })}
        />

        <SimpleInput
          label="Duration"
          inputMode="numeric"
          type="text"
          errorMessage={errors.duration?.message as (string | undefined)}
          {...register(WORKOUT_FIELDS.duration, {
            required: "This is required",
            min: { value: 0, message: "Workout duration must be greater than 0" },
            validate: validateNumber 
          })}
        />

        <SimpleInput
          label="Average speed"
          inputMode="numeric"
          type="text"
          errorMessage={errors.distance?.message as (string | undefined)}
          {...register(WORKOUT_FIELDS.averageSpeed, {
            required: "This is required",
            min: { value: 0, message: "Average speed must be greater than 0" },
            validate: validateNumber 
          })}
        />

        <SimpleInput
          label="Average heart rate"
          inputMode="numeric"
          type="text"
          errorMessage={errors.heartRate?.message as (string | undefined)}
          {...register(WORKOUT_FIELDS.heartRate, {
            required: "This is required",
            min: { value: 0, message: "Average heart rate must be greater than 0" },
            validate: validateNumber 
          })}
        />

        <SimpleSelect
          label="What kind of workout was it?"
          options={Object.keys(WorkoutMode).map(mode => ({ label: mode, value: mode }))}
          errorMessage={errors.mode?.message as (string | undefined)}
          {...register(WORKOUT_FIELDS.mode, { required: "This is required" })}
        />

        <SimpleSelect
          label="Rate your workout"
          options={[5, 4, 3, 2, 1].map(n => ({ label: n.toString(), value: n.toString() }))}
          errorMessage={errors.rating?.message as (string | undefined)}
          {...register(WORKOUT_FIELDS.rating, { required: "This is required" })}
        />

        <SimpleTextArea
          label="Describe your workout in a few words"
          {...register(WORKOUT_FIELDS.description)}
        />
        <button
          type="submit"
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Register
        </button>
      </div>
    </form>
  )
}

export default App
