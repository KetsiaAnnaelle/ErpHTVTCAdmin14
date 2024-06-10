<?php

namespace App\Http\Controllers;

use App\Models\NewPerfPerso;
use Illuminate\Console\View\Components\Alert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NewPerfPersoController extends Controller
{
    /**
         * Display a listing of the resource.
         */
        public function index()
        {


        }

        public function seeNewPerformance(string $id)
        {

          $newPerformance=NewPerfPerso::find($id)
                  ->get();

            return response()->json($newPerformance);

        }

        public function show(string $id)
         {

            try {
                $newPerformances = DB::table('new_performance_persos')
                    ->join('performance_persos', 'performance_persos.id', '=', 'new_performance_persos.performance_perso_id')
                    ->select('new_performance_persos.id','new_performance_persos.performance_perso_id','new_performance_persos.notePerfPerso',
                    'new_performance_persos.avisPerfPerso','new_performance_persos.created_at','performance_persos.supprimer','performance_persos.archiver')
                    ->where('new_performance_persos.performance_perso_id',$id)
                    ->where('performance_persos.supprimer',0)
                    ->where('performance_persos.archiver',0)
                    ->get();
                    \Log::info('New Performance:', $newPerformances->toArray());
                return response()->json($newPerformances->toArray());
            } catch (\Throwable $e) {
                \Log::error($e);
                return response()->json(['error' => $e->getMessage()], 500);
            }

         }

        /**
         * Show the form for creating a new resource.
         */
        public function create()
        {

        }

        /**
         * Store a newly created resource in storage.
         */
        public function store(Request $request, string $id)
        {
            try {
                NewPerfPerso::create([
                    'notePerfPerso'=> $request->input('notePerfPerso'),
                    'avisPerfPerso'=> $request->input('avisPerfPerso'),
                    'performance_perso_id'=> $id,
                ]);
                return response()->json([
                    'message'=>'true'
                ]);
            } catch (\Throwable $e) {
                return response()->json([
                    'message'=>$e
                ]);
            }
        }


        /**
         * Show the form for editing the specified resource.
         */
        public function edit(string $id)
        {
            //
        }

        /**
         * Update the specified resource in storage.
         */
        public function update(Request $request, string $id)
        {
            try {
                $newPerformance=NewPerfPerso::find($id);

                $newPerformance->update([
                    'notePerfPerso'=> $request->input('notePerfPerso'),
                    'avisPerfPerso'=> $request->input('avisPerfPerso'),
                ]);

                return response()->json([
                    'message'=>$id
                ]);

            } catch (\Throwable $e) {
                return response()->json([
                    'message'=>$e
                ]);
            }


        }

        /**
         * Remove the specified resource from storage.
         */
        public function destroy(string $id)
        {
            //
        }
}
