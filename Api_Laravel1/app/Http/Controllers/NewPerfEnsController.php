<?php

namespace App\Http\Controllers;

use App\Models\NewPerfEns;
use Illuminate\Console\View\Components\Alert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NewPerfEnsController extends Controller
{
    /**
         * Display a listing of the resource.
         */
        public function index()
        {


        }

        public function seeNewPerformance(string $id)
        {

          $newPerformance=NewPerfEns::find($id)
                  ->get();

            return response()->json($newPerformance);

        }

        public function show(string $id)
         {

            try {
                $newPerformances = DB::table('new_performance_ens')
                    ->join('performance_ens', 'performance_ens.id', '=', 'new_performance_ens.performance_ens_id')
                    ->select('new_performance_ens.id','new_performance_ens.performance_ens_id','new_performance_ens.notePerfEns',
                    'new_performance_ens.avisPerfEns','new_performance_ens.created_at','performance_ens.supprimer','performance_ens.archiver')
                    ->where('new_performance_ens.performance_ens_id',$id)
                    ->where('performance_ens.supprimer',0)
                    ->where('performance_ens.archiver',0)
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
                NewPerfEns::create([
                    'notePerfEns'=> $request->input('notePerfEns'),
                    'avisPerfEns'=> $request->input('avisPerfEns'),
                    'performance_ens_id'=> $id,
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
                $newPerformance=NewPerfEns::find($id);

                $newPerformance->update([
                    'notePerfEns'=> $request->input('notePerfEns'),
                    'avisPerfEns'=> $request->input('avisPerfEns'),
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
