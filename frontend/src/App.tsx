import { useForm } from 'react-hook-form'
import './index.css'
import { validateDate } from './validators';
import { WorkoutInput } from './WorkoutInput';

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
        <WorkoutInput
          label="Date"
          type="datetime-local"
          errorMessage={errors.date?.message as (string | undefined)}
          {...register(WORKOUT_FIELDS.date, { required: "This is required", validate: validateDate })}
        />
        <WorkoutInput
          label="Distance"
          type="number"
          errorMessage={errors.distance?.message as (string | undefined)}
          {...register(WORKOUT_FIELDS.distance, { required: "This is required", min: { value: 0, message: "Workout distance must be greater than 0" } })}
        />

        <WorkoutInput
          label="Duration"
          type="number"
          errorMessage={errors.duration?.message as (string | undefined)}
          {...register(WORKOUT_FIELDS.duration, { required: "This is required", min: { value: 0, message: "Workout duration must be greater than 0" } })}
        />

        <WorkoutInput
          label="Average speed"
          type="number"
          errorMessage={errors.distance?.message as (string | undefined)}
          {...register(WORKOUT_FIELDS.averageSpeed, { required: "This is required", min: { value: 0, message: "Average speed must be greater than 0" } })}
        />

        <WorkoutInput
          label="Average heart rate"
          type="number"
          errorMessage={errors.heartRate?.message as (string | undefined)}
          {...register(WORKOUT_FIELDS.heartRate, { required: "This is required", min: { value: 0, message: "Average heart rate must be greater than 0" } })}
        />

        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label htmlFor={WORKOUT_FIELDS.mode} className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            Running mode
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <select
              id={WORKOUT_FIELDS.mode}
              className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              {...register(WORKOUT_FIELDS.mode, { required: "This is required" })}
            >
              {Object.keys(WorkoutMode).map(mode => (
                <option>{mode}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label htmlFor={WORKOUT_FIELDS.rating} className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            Rate your workout
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <select
              id={WORKOUT_FIELDS.rating}
              className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              {...register(WORKOUT_FIELDS.rating, { required: "This is required" })}
            >
              {[5, 4, 3, 2, 1].map(n => (
                <option>{n}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label htmlFor={WORKOUT_FIELDS.description} className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            Describe your workout in a few words
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <textarea
              id={WORKOUT_FIELDS.description}
              className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              {...register(WORKOUT_FIELDS.description)}
            />
          </div>
        </div>
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
